var express = require('express');
var router = express.Router();
var Recording = require("../controllers/recording") 

router.get('/:id/artistsCredit', async function(req, res) {
    var data = await Recording.getArtistsCredit(req.params.id)
    res.jsonp(data)
});

router.get('/:id/urls', async function(req, res) {
    var data = await Recording.getURLs(req.params.id)
    res.jsonp(data)
});

router.get('/:id/languages', async function(req, res) {
    var data = await Recording.getLanguages(req.params.id)
    res.jsonp(data)
});

router.get('/:id/tags', async function(req, res) {
    var data = await Recording.getTags(req.params.id)
    res.jsonp(data)
});

router.get('/:id', async function(req, res) {
    var data = await Recording.getRecording(req.params.id)
    res.jsonp(data)
});

router.get('/', async function(req, res) {
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
