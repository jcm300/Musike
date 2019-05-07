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

var albumAPIRouter = require('./routes/album')
var areaAPIRouter = require('./routes/area')
var artistAPIRouter = require('./routes/artist')
var recordingAPIRouter = require('./routes/recording')
var usersAPIRouter = require('./routes/user')

var app = express();

//Database connection
mongoose.connect("mongodb://127.0.0.1:27017/Musike", {useNewUrlParser: true})
        .then(() => console.log("Mongo status " + mongoose.connection.readyState))
        .catch(() => console.log("Mongo: connection error."))

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

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    next();
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/albums', albumAPIRouter)
app.use('/areas', areaAPIRouter)
app.use('/artists', artistAPIRouter)
app.use('/recordings', recordingAPIRouter)
app.use('/users', usersAPIRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.jsonp('ERROR: ' + res.locals.message + ' -> ' + res.locals.error);
});

module.exports = app;
