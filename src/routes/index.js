var express = require('express');
var router = express.Router();
var axios = require('axios')
const passport = require("passport")
const jwt = require("jsonwebtoken")
var fs = require("fs")
var auth = require("../auth/auth")

router.get("/main", auth.isAuthenticated, (req, res) => {
    axios.get(req.app.locals.url + 'api/article', {headers: {"cookie": req.headers.cookie}, withCredentials: true})
        .then(articles => {
            res.render("menus/main",{idU: req.session._id, userType: req.session.type, articles: articles.data, success: req.flash('success'), error: req.flash('error')})
        })
        .catch(error => {
            console.log("Error in get articles: " + error)
            res.render("error", {message: "Error", error: 'Error accessing main area. Try again!'})
        })
})

router.get('/logout', auth.isAuthenticated, function(req, res){
    req.session.destroy()
    req.logOut()
    res.redirect('/')
});

router.get("/", auth.authenticated, (req, res) => {
    res.render("menus/login",{success: req.flash('success'), error: req.flash('error')})
})

router.post("/login", auth.authenticated, async (req, res, next) => {
    passport.authenticate("login", async (err, user, info) => {
        try{
            if(err || !user) {
                if(!user) {
                    req.flash('error',info.message)
                    return res.redirect(req.app.locals.url)
                }else return next(err)
            }
            req.login(user, {session: false}, async (error) => {
                if(error) return next(error)
                var myuser = {_id: user._id, email: user.email}
                //Token Generation
                var privateKey = fs.readFileSync("./auth/private.key", "utf8")
                var token = jwt.sign({user: myuser}, privateKey, {expiresIn: '30m', algorithm: "RS256"})
                req.session.token = token
                req.session._id = user._id
                req.session.type = user.type
                req.flash('success','Login with success!')
                res.redirect(req.app.locals.url + "main")
            })
        }catch(error){
            return next(error)
        }
    })(req,res,next)
})

module.exports = router