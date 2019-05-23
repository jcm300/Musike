var express = require('express');
var router = express.Router();
var Artist = require("../controllers/artist") 
var auth = require("../auth/auth")

router.get('/:id/tags', auth.isAuthenticated, async function(req, res) {
    var data = await Artist.getTags(req.params.id)
    res.jsonp(data)
});

router.get('/:id/albums', auth.isAuthenticated, async function(req, res) {
    var data = await Artist.getAlbums(req.params.id)
    res.jsonp(data)
});

router.get('/:id/recordings', auth.isAuthenticated, async function(req, res) {
    var data = await Artist.getRecordings(req.params.id)
    res.jsonp(data)
});

router.get('/:id/urls', auth.isAuthenticated, async function(req, res) {
    var data = await Artist.getURLs(req.params.id)
    res.jsonp(data)
});

router.get('/:id/aliases', auth.isAuthenticated, async function(req, res) {
    var data = await Artist.getAliases(req.params.id)
    res.jsonp(data)
});

router.get('/:id', auth.isAuthenticated, async function(req, res) {
    var data = await Artist.getArtist(req.params.id)
    res.jsonp(data)
});

router.get('/', auth.isAuthenticated, async function(req, res) {
    var data
    if(req.query.filter){
        if(req.query.offset)
            data = await Artist.listArtistsByFilter(req.query.offset,req.query.filter)
        else
            data = await Artist.listArtistsByFilter(0,req.query.filter)
    }else{
        if(req.query.offset)
            data = await Artist.listArtists(req.query.offset)
        else
            data = await Artist.listArtists(0)
    }
    res.jsonp(data)
});

module.exports = router;
