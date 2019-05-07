var express = require('express');
var router = express.Router();
var Album = require("../../controllers/album") 

router.get('/:id/tags', async function(req, res) {
    var data = await Album.getTags(req.params.id)
    res.jsonp(data)
});

router.get('/:id/tracks', async function(req, res) {
    var data = await Album.getTracks(req.params.id)
    res.jsonp(data)
});

router.get('/:id/artistsCredit', async function(req, res) {
    var data = await Album.getArtistsCredit(req.params.id)
    res.jsonp(data)
});

router.get('/:id/urls', async function(req, res) {
    var data = await Album.getURLs(req.params.id)
    res.jsonp(data)
});

router.get('/:id', async function(req, res) {
    var data = await Album.getAlbum(req.params.id)
    res.jsonp(data)
});

router.get('/', async function(req, res) {
    var data
    if(req.query.filter){
        if(req.query.offset)
            data = await Album.listAlbumsByFilter(req.query.offset,req.query.filter)
        else
            data = await Album.listAlbumsByFilter(0,req.query.filter)
    }else{
        if(req.query.offset)
            data = await Album.listAlbums(req.query.offset)
        else
            data = await Album.listAlbums(0)
    }
    res.jsonp(data)
});

module.exports = router;
