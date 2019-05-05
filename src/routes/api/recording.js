var express = require('express');
var router = express.Router();
var Recording = require("../controllers/recording") 
var prettyPrint = require("./prettyPrint.js").prettyPrint

router.get('/:id/artistsCredit', async function(req, res) {
    var data = await Recording.getArtistsCredit(req.params.id)
    res.jsonp(prettyPrint(data))
});

router.get('/:id/urls', async function(req, res) {
    var data = await Recording.getURLs(req.params.id)
    res.jsonp(prettyPrint(data))
});

router.get('/:id', async function(req, res) {
    var data = await Recording.getRecording(req.params.id)
    res.jsonp(prettyPrint(data))
});

router.get('/', async function(req, res) {
    var data = await Recording.listRecordings()
    res.jsonp(prettyPrint(data))
});

module.exports = router;
