var express = require('express');
var router = express.Router();
var Users = require("../controllers/user")
var Stats = require("../controllers/stats")
var auth = require("../auth/auth")
var passport = require("passport")

router.get('/isAuthenticated', auth.isAuthenticated, function(req, res) {
    res.jsonp("Authenticated")
})

router.get('/:id/favs', auth.isAuthenticated, function(req, res) {
    if(req.params.id==req.user._id){
        Users.getFavs(req.params.id)
            .then(data => res.jsonp(data))
            .catch(error => res.status(500).jsonp(error))
    }else{
        res.status(403).jsonp("You have no permission to modify info of another user!")
    }
});

router.get('/:id/isFav/:idMusic', auth.isAuthenticated, function(req, res) {
    if(req.params.id==req.user._id){
        Users.isFav(req.params.id,req.params.idMusic)
            .then(data => res.jsonp(data))
            .catch(error => res.status(500).jsonp(error))
    }else{
        res.status(403).jsonp("You have no permission to modify info of another user!")
    }
});

router.get('/:id/statsMostViews', auth.isAuthenticated, function(req, res) {
    if(req.params.id==req.user._id){
        Users.getMostRecordingsViewsUser(req.params.id)
            .then(data => res.jsonp(data))
            .catch(error => res.status(500).jsonp(error))
    }else{
        res.status(403).jsonp("You cannot access info from another user!")
    }
});

router.get('/:id/statsMostRating', auth.isAuthenticated, function(req, res) {
    if(req.params.id==req.user._id){
        Users.getMostRecordingsRatingUser(req.params.id)
            .then(data => res.jsonp(data))
            .catch(error => res.status(500).jsonp(error))
    }else{
        res.status(403).jsonp("You cannot access info from another user!")
    }
});

router.get('/:id/stats', auth.isAuthenticated, function(req, res) {
    if(req.params.id==req.user._id){
        if(req.query.idRec!=null){
            Users.getRecordingUserRating(req.params.id,req.query.idRec)
                .then(data => res.jsonp(data))
                .catch(error => res.status(500).jsonp(error))           
        }else{
            Users.getRecordingsUser(req.params.id)
                .then(data => res.jsonp(data))
                .catch(error => res.status(500).jsonp(error))
        }
    }else{
        res.status(403).jsonp("You cannot access info from another user!")
    }
});

router.get('/:id', auth.isAuthenticated, function(req, res) {
    if(req.params.id==req.user._id){
        Users.getUser(req.params.id)
            .then(data => {
                var user = {_id: data._id, name: data.name, email: data.email, stats: data.stats}
                res.jsonp(user)
            })
            .catch(error => res.status(500).jsonp(error))
    }else{
        res.status(403).jsonp("You cannot access info from another user!")
    }
});

//only admin should be allow to do this
/*
router.get('/', auth.isAuthenticated, function(req, res) {
    Users.list()
        .then(data => res.jsonp(data))
        .catch(error => res.status(500).jsonp(error))
});
*/

router.post('/login', async (req, res, next) => {
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
                    var token = auth.genToken(user._id,user.email)
                    res.jsonp({id: user._id, token: token})
                })
            }
        }catch(error){
            return next(error)
        }
    })(req,res,next)
});

router.post('/', function(req, res) {
    Users.createUser(req.body)
        .then(data => res.jsonp(data))
        .catch(error => res.status(500).jsonp(error))
});

router.put('/updPass/:id', auth.isAuthenticated, function(req, res) {
    if(req.params.id==req.user._id){
        Users.updatePassword(req.params.id,req.body.prevPass,req.body.newPass)
            .then(data => res.jsonp(data))
            .catch(error => res.status(500).jsonp(error))
    }else{
        res.status(403).jsonp("You have no permission to modify a pass of another user!")
    }
});

router.put('/views/:id', auth.isAuthenticated, function(req, res) {
    if(req.params.id==req.user._id){
        Users.updateViews(req.params.id,req.body.idMusic)
            .then(data => res.jsonp(data))
            .catch(error => res.status(500).jsonp(error))
    }else{
        res.status(403).jsonp("You have no permission to modify info of another user!")
    }
});

router.put('/rating/:id', auth.isAuthenticated, function(req, res) {
    if(req.params.id==req.user._id){
        Users.updateRating(req.params.id,req.body.idMusic,parseInt(req.body.rating))
            .then(data => res.jsonp(data))
            .catch(error => res.status(500).jsonp(error))
    }else{
        res.status(403).jsonp("You have no permission to modify info of another user!")
    }
});

router.put('/addFav/:id', auth.isAuthenticated, function(req, res) {
    if(req.params.id==req.user._id){
        Users.addFav(req.params.id,req.body.idMusic)
            .then(data => res.jsonp(data))
            .catch(error => res.status(500).jsonp(error))
    }else{
        res.status(403).jsonp("You have no permission to modify info of another user!")
    }
});

router.put('/removeFav/:id', auth.isAuthenticated, function(req, res) {
    if(req.params.id==req.user._id){
        Users.removeFav(req.params.id,req.body.idMusic)
            .then(data => res.jsonp(data))
            .catch(error => res.status(500).jsonp(error))
    }else{
        res.status(403).jsonp("You have no permission to modify info of another user!")
    }
});

router.put('/:id', auth.isAuthenticated, function(req, res) {
    if(req.params.id==req.user._id){
        Users.updateUser(req.params.id,req.body)
            .then(data => res.jsonp(data))
            .catch(error => res.status(500).jsonp(error))
    }else{
        res.status(403).jsonp("You have no permission to modify info of another user!")
    }
});

/*
router.put('/delStat/:id', auth.isAuthenticated, function(req, res) {
    if(req.params.id==req.user._id){
        Users.deleteStat(req.params.id)
            .then(data => res.jsonp(data))
            .catch(error => res.status(500).jsonp(error))
    }else{
        res.status(403).jsonp("You have no permission to modify info of another user!")
    }
});*/

router.delete('/:id', auth.isAuthenticated, function(req, res) {
    if(req.params.id==req.user._id){
        Users.deleteUser(req.params.id)
            .then(data => {
                var stats = data.stats
                var promises = []
                for(var i=0; i<stats.length; i++)
                    promises.push(Stats.createOrUpdate(stats[i]))
                Promise.all(promises)
                    .then(responses => res.jsonp(responses))
                    .catch(error => res.status(500).jsonp(error))
            })
            .catch(error => res.status(500).jsonp(error))
    }else{
        res.status(403).jsonp("You have no permission to delete another user!")
    }
})

module.exports = router;
