var express = require('express')
var router = express.Router()
var axios = require("axios")
var auth = require("../auth/auth")
var fs = require("fs")

function deleteSessions(id,res){
    var files = fs.readdirSync("sessions")
    files.forEach( file => {
        var obj;
        var data = fs.readFileSync("sessions/" + file)
        var obj = JSON.parse(data);
        
        if(obj._id == id)
            fs.unlinkSync("sessions/" + file)
    })
}

router.get('/user/:id', auth.isAuthenticated, auth.havePermissions(["1"]), (req,res) => {
    axios.get(req.app.locals.url + "api/user/" + req.params.id, {headers: {"cookie": req.headers.cookie}, withCredentials: true})
        .then(user => res.render("users/updateUser", {user: user.data, error: req.flash('error')}))
        .catch(error => {
            console.log("Error while getting user: " + error)
            req.flash('error','Error. Try again!')
            res.redirect(req.app.locals.url + 'users/' + req.params.id)
        }) 
})

router.get('/user', auth.authenticated, (req,res) => {
    res.render("menus/register", {error: req.flash('error')})
})

router.get('/updPass/:id', auth.isAuthenticated, (req,res) => {
    res.render("users/updatePass",{idU: req.params.id, errorPass: req.flash('errorPass')})
})

router.get('/:id', auth.isAuthenticated, auth.havePermissions(["1"]), (req,res) => {
    axios.get(req.app.locals.url + "api/user/" + req.params.id, {headers: {"cookie": req.headers.cookie}, withCredentials: true})
        .then(user => res.render("users/user", {user: user.data, success: req.flash('success'), error: req.flash('error')}))
        .catch(error => {
            console.log("Error while showing user: " + error)
            req.flash('error','Error. Try again!')
            res.redirect(req.app.locals.url + 'users')
        })
})

router.get('/', auth.isAuthenticated, auth.havePermissions(["1"]), (req,res) => {
    axios.get(req.app.locals.url + "api/user", {headers: {"cookie": req.headers.cookie}, withCredentials: true})
        .then(users => res.render("users/users", {users: users.data, success: req.flash('success'), error: req.flash('error')}))
        .catch(error => {
            console.log("Error while getting users: " + error)
            req.flash('error','Error. Try again!')
            res.redirect(req.app.locals.url + 'main')
        })
})

router.post('/', auth.authenticated, (req, res) => {
    axios.post(req.app.locals.url + "api/user", req.body, {headers: {"cookie": req.headers.cookie}, withCredentials: true})
        .then( user => {
            req.flash('success','Registration with sucess! Now your account wait approvement!')
            res.redirect(req.app.locals.url)
        })
        .catch(error => {
            console.log("Error in insert user: " + error)
            req.flash('error','Error. Maybe email already exists? Try again!')
            res.redirect(req.app.locals.url + 'users/user')
        })
})

router.put('/updPass/:id', auth.isAuthenticated, (req, res) => {
    if(req.params.id==req.session._id){
        axios.put(req.app.locals.url + "api/user/updPass/" + req.params.id, req.body, {headers: {"cookie": req.headers.cookie}, withCredentials: true})
            .then(d => {
                if(d.data!=null) {
                    req.flash('success',"Password Changed!")
                    res.jsonp(req.app.locals.url + "main")
                }else{
                    req.flash('errorPass',"Wrong Password!")
                    res.jsonp(req.app.locals.url + "users/updPass/" + req.params.id)
                }
            })
            .catch(error => {
                console.log("Error in update pass user: " + error)
                req.flash('error','Error. Try again!')
                res.jsonp(req.app.locals.url + 'users/updPass/' + req.params.id)
            })
    }else{
        req.flash('error',"You have no permission to modify a pass of another user!")
        res.jsonp(req.app.locals.url + "main")
    }
})

router.put('/:id', auth.isAuthenticated, auth.havePermissions(["1"]), (req, res) => {
    axios.put(req.app.locals.url + "api/user/" + req.params.id, req.body, {headers: {"cookie": req.headers.cookie}, withCredentials: true})
        .then(() => {
            //delete sessions
            deleteSessions(req.params.id)
            req.flash('success','User Updated!') 
            res.jsonp(req.app.locals.url + "users/" + req.params.id)
        })
        .catch(error => {
            console.log("Error in update user: " + error)
            req.flash('error','Error. Maybe email already exists? Try again!')
            res.jsonp(req.app.locals.url + 'users/user/' + req.params.id)
        })
})

router.delete('/:id', auth.isAuthenticated, auth.havePermissions(["1"]), (req, res) => {
    axios.delete(req.app.locals.url + "api/user/" + req.params.id, {headers: {"cookie": req.headers.cookie}, withCredentials: true})
        .then(() => {
            //delete sessions
            deleteSessions(req.params.id,res)
            req.flash('success','User Deleted!')
            res.jsonp(req.app.locals.url + "users")
        })
        .catch(error => {
            console.log("Error in delete user: " + error)
            req.flash('error','Error. Try again!')
            res.redirect(req.app.locals.url + 'users/' + req.params.id)
        })
})

module.exports = router
