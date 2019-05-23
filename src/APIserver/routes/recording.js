var express = require('express');
var router = express.Router();
var Recording = require("../controllers/recording") 
var auth = require("../auth/auth")

router.get('/:id/artistsCredit', auth.isAuthenticated, async function(req, res) {
    var data = await Recording.getArtistsCredit(req.params.id)
    res.jsonp(data)
});

router.get('/:id/urls', auth.isAuthenticated, async function(req, res) {
    var data = await Recording.getURLs(req.params.id)
    res.jsonp(data)
});

router.get('/:id/languages', auth.isAuthenticated, async function(req, res) {
    var data = await Recording.getLanguages(req.params.id)
    res.jsonp(data)
});

router.get('/:id/tags', auth.isAuthenticated, async function(req, res) {
    var data = await Recording.getTags(req.params.id)
    res.jsonp(data)
});

router.get('/:id', auth.isAuthenticated, async function(req, res) {
    var data = await Recording.getRecording(req.params.id)
    res.jsonp(data)
});

router.get('/', auth.isAuthenticated, async function(req, res) {
    var data
    if(req.query.filter){
        if(req.query.offset)
            data = await Recording.listRecordingsByFilter(req.query.offset,req.query.filter)
        else
            data = await Recording.listRecordingsByFilter(0,req.query.filter)
    }else{
        if(req.query.offset)
            data = await Recording.listRecordings(req.query.offset)
        else
            data = await Recording.listRecordings(0)
    }
    res.jsonp(data)
});

module.exports = router;
