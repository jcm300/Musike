var express = require('express');
var router = express.Router();
var Album = require("../controllers/album") 
var prettyPrint = require("./prettyPrint.js").prettyPrint

router.get('/:id/tags', async function(req, res) {
    var data = await Album.getTags(req.params.id)
    res.jsonp(prettyPrint(data))
});

router.get('/:id/tracks', async function(req, res) {
    var data = await Album.getTracks(req.params.id)
    res.jsonp(prettyPrint(data))
});

router.get('/:id/artistsCredit', async function(req, res) {
    var data = await Album.getArtistsCredit(req.params.id)
    res.jsonp(prettyPrint(data))
});

router.get('/:id/urls', async function(req, res) {
    var data = await Album.getURLs(req.params.id)
    res.jsonp(prettyPrint(data))
});

router.get('/:id', async function(req, res) {
    var data = await Album.getAlbum(req.params.id)
    res.jsonp(prettyPrint(data))
});

router.get('/', async function(req, res) {
    var data = await Album.listAlbums()
    res.jsonp(prettyPrint(data))
});

module.exports = router;
