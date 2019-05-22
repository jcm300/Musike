var express = require('express');
var router = express.Router();
var Users = require("../controllers/user")
var auth = require("../auth/auth")
var passport = require("passport")
const jwt = require("jsonwebtoken")
var fs = require("fs")

router.get('/isAuthenticated', auth.isAuthenticated, function(req, res) {
    res.jsonp("Authenticated")
})

router.get('/:id', /*auth.isAuthenticated,*/ function(req, res) {
    Users.getUser(req.params.id)
        .then(data => res.jsonp(data))
        .catch(error => res.status(500).jsonp(error))
});

router.get('/', auth.isAuthenticated, function(req, res) {
    Users.list()
        .then(data => res.jsonp(data))
        .catch(error => res.status(500).jsonp(error))
});

router.post('/login', /*auth.authenticated,*/ async (req, res, next) => {
    passport.authenticate("login", async (err, user, info) => {
        try{
            if(err || !user) {
                if(!user) {
                    console.log(info.message)
                    res.status(500).jsonp(info.message)
                }else return next(err)
            }else{
                req.login(user, {session: false}, async (error) => {
                    if(error) return next(error)
                    var myuser = {_id: user._id, email: user.email}
                    //Token Generation
                    var privateKey = fs.readFileSync("./auth/private.key", "utf8")
                    var token = jwt.sign({user: myuser}, privateKey, {expiresIn: '30m', algorithm: "RS256"})
                    res.jsonp(token)
                })
            }
        }catch(error){
            return next(error)
        }
    })(req,res,next)
});

router.post('/', /*auth.isAuthenticated,*/ function(req, res) {
    Users.createUser(req.body)
        .then(data => res.jsonp(data))
        .catch(error => res.status(500).jsonp(error))
});

router.put('/updPass/:id', /*auth.isAuthenticated,*/ function(req, res) {
    if(req.params.id==req.session._id){
        Users.updatePassword(req.params.id,req.body.prevPass,req.body.newPass)
            .then(data => res.jsonp(data))
            .catch(error => res.status(500).jsonp(error))
    }else{
        res.jsonp("You have no permission to modify a pass of another user!")
    }
});

router.put('/:id', /*auth.isAuthenticated,*/ function(req, res) {
    Users.updateUser(req.params.id,req.body)
        .then(data => res.jsonp(data))
        .catch(error => res.status(500).jsonp(error))
});

router.put('/views/:id', /*auth.isAuthenticated,*/ function(req, res) {
    Users.updateViews(req.params.id,req.body.idMusic)
        .then(data => res.jsonp(data))
        .catch(error => res.status(500).jsonp(error))
});

router.put('/rating/:id', /*auth.isAuthenticated,*/ function(req, res) {
    Users.updateRating(req.params.id,req.body.idMusic,parseInt(req.body.rating))
        .then(data => res.jsonp(data))
        .catch(error => res.status(500).jsonp(error))
});

router.put('/delStat/:id', /*auth.isAuthenticated,*/ function(req, res) {
    Users.deleteStat(req.params.id)
        .then(data => res.jsonp(data))
        .catch(error => res.status(500).jsonp(error))
});

router.delete('/:id', /*auth.isAuthenticated,*/ function(req, res) {
    Users.deleteUser(req.params.id)
        .then(data => res.jsonp(data))
        .catch(error => res.status(500).jsonp(error))
})

module.exports = router;
