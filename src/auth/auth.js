var passport = require("passport")
var localStrategy = require("passport-local").Strategy
var UserController = require("../controllers/user")
var axios = require("axios")

//Users Login
passport.use("login", new localStrategy({
    usernameField: "email",
    passwordField: "password"
}, async (email, password, done) => {
    try{
        user = await UserController.findOne(email)
        if(!user) return done(null, false, {message: "User not found!"})
        if(!user.approved) return done(null, false, {message: "Account not approved by admin!"})
        var valid = await UserController.isValidPassword(password, user.password)
        if(!valid) return done(null, false, {message: "Invalid Password!"})

        return done(null, user, {message: "User authenticated!"})
    }catch(error){
        return done(error)
    }
}))

//Token Verification
var JWTstrategy = require("passport-jwt").Strategy
var ExtractJWT = require("passport-jwt").ExtractJwt
var fs = require("fs")

var extractFromSession = function(req){
    var token = null
    if(req && req.session) token = req.session.token
    return token
}

passport.use("jwt", new JWTstrategy({
    secretOrKey: fs.readFileSync("./auth/public.key", "utf8"),
    algorithms: ["RS256"],
    jwtFromRequest: ExtractJWT.fromExtractors([extractFromSession])
}, async (token, done) => {
    try{
        return done(null, token.user)
    }catch(error){
        return done(error)
    }
}))

//Check if user is authenticated
module.exports.isAuthenticated = passport.authenticate("jwt", {
    session: false, 
    failureRedirect: '/',
    failureFlash: 'Not Authenticated!',
})

//if authenticated redirect to main
module.exports.authenticated = (req,res,next) => passport.authenticate("jwt", {
    session: false,
}, (err, session, info) => {
    if (err) return next(err)
    if (!session) next()
    else res.redirect(req.app.locals.url + "main")
})(req,res,next)

//Verify if user have the necessary permissions to acess page
//level var is a list with the type of users that have permissions
module.exports.havePermissions = function(level) {
    return function(req, res, next) {
        var size = level.length
        var haveP = false
        
        for(var i=0; i<size; i++)
            if(level[i]==req.session.type) haveP = true
        
        if(haveP) next()
        else{
            req.flash('error', "Permission Denied!")
            res.redirect(req.app.locals.url + "main")
        }
    }
}

//create user root if not exists
module.exports.createAdmin = async function(password){
    var admin = await UserController.findOne("root@root")
    if(admin==null){
        admin = {name: "root", email: "root@root", password: password, type: "1", approved: true, stats: []}
        UserController.createUser(admin)
            .catch(error => console.log("Root user not created " + error))
    }
}