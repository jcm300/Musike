var express = require('express');
var router = express.Router();
var Artist = require("../controllers/artist") 
var prettyPrint = require("./prettyPrint.js").prettyPrint

router.get('/:id/tags', async function(req, res) {
    var data = await Artist.getTags(req.params.id)
    res.jsonp(prettyPrint(data))
});

router.get('/:id/albums', async function(req, res) {
    var data = await Artist.getAlbums(req.params.id)
    res.jsonp(prettyPrint(data))
});

router.get('/:id/recordings', async function(req, res) {
    var data = await Artist.getRecordings(req.params.id)
    res.jsonp(prettyPrint(data))
});

router.get('/:id/urls', async function(req, res) {
    var data = await Artist.getURLs(req.params.id)
    res.jsonp(prettyPrint(data))
});

router.get('/:id', async function(req, res) {
    var data = await Artist.getArtist(req.params.id)
    res.jsonp(prettyPrint(data))
});

router.get('/', async function(req, res) {
    var data = await Artist.listArtists()
    res.jsonp(prettyPrint(data))
});

module.exports = router;
