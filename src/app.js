var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');

var mongoose = require("mongoose")
var uuid = require("uuid/v4")
var passport = require('passport')
var session = require("express-session")
var FileStore = require("session-file-store")(session)
var flash = require('connect-flash')
var fs = require('fs')

require('./auth/auth')
var auth = require('./auth/auth')

var indexRouter = require('./routes/index')
var usersAPIRouter = require('./routes/api/user')
var usersRouter = require('./routes/users')

var app = express();

//define global variables
app.locals.url="http://localhost:3000/"

//Database connection
mongoose.connect("mongodb://127.0.0.1:27017/Musike", {useNewUrlParser: true})
        .then(() => console.log("Mongo status " + mongoose.connection.readyState))
        .catch(() => console.log("Mongo: connection error."))

//create user root if not exists
//arguments: password 
//WARNING: Change password!!!!
auth.createAdmin("musike")

//register logs on json file
//open file, if not exists create it
var accessLogStream = fs.createWriteStream(__dirname + '/log.json', {flags: 'a'});

//session configuration
app.use(session({
  genid: () => {
    return uuid()
  },
  store: new FileStore(),
  secret: "^Qn//'8_hY5RxS*{",
  resave: false,
  saveUninitialized: true
}))

app.use(passport.initialize())
app.use(passport.session())

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//save logs to file in json format
app.use(logger('{"date": ":date[iso]", "method": ":method", "url": ":url", "status": ":status", "result_length": ":res[content-length]", "referrer": ":referrer", "response_time": ":response-time"}', {stream: accessLogStream}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(flash())

//protect files in public folder
app.use("/javascripts/*",auth.isAuthenticated)
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/user', usersAPIRouter)
app.use('/users',usersRouter)
app.use('/', indexRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
