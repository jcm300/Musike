var express = require('express');
var router = express.Router();
var Area = require("../controllers/area") 
var auth = require("../auth/auth")
var fs = require("fs")

router.get('/countriesWithMostAlbums', auth.isAuthenticated, async function(req, res) {
    var data
    if(req.query.cache == "true"){
        var file = fs.readFileSync("cache/countriesWithMostAlbums.json")
        data = JSON.parse(file)
    }else{
        data = await Area.countriesWithMostAlbums()
    }
    res.jsonp(data)
});

router.get('/countriesWithMostRecordings', auth.isAuthenticated, async function(req, res) {
    var data
    if(req.query.cache == "true"){
        var file = fs.readFileSync("cache/countriesWithMostRecordings.json")
        data = JSON.parse(file)
    }else{
        data = await Area.countriesWithMostRecordings()
    }
    res.jsonp(data)
});

router.get('/countriesWithMostArtists', auth.isAuthenticated, async function(req, res) {
    var data
    if(req.query.cache == "true"){
        var file = fs.readFileSync("cache/countriesWithMostArtists.json")
        data = JSON.parse(file)
    }else{
        data = await Area.countriesWithMostArtists()
    }
    res.jsonp(data)
});

router.get('/:id/aliases', auth.isAuthenticated, async function(req, res) {
    var data = await Area.getAliases(req.params.id)
    res.jsonp(data)
});

router.get('/:id/artists', auth.isAuthenticated, async function(req, res) {
    var data = await Area.getArtists(req.params.id)
    res.jsonp(data)
});

router.get('/:id/urls', auth.isAuthenticated, async function(req, res) {
    var data = await Area.getURLs(req.params.id)
    res.jsonp(data)
});

router.get('/:id/parts', auth.isAuthenticated, async function(req, res) {
    var data = await Area.getParts(req.params.id)
    res.jsonp(data)
});

router.get('/:id/partOf', auth.isAuthenticated, async function(req, res) {
    var data = await Area.getPartOf(req.params.id)
    res.jsonp(data)
});

router.get('/:id', auth.isAuthenticated, async function(req, res) {
    var data = await Area.getArea(req.params.id)
    res.jsonp(data)
});

router.get('/', auth.isAuthenticated, async function(req, res) {
    var data
    if(req.query.filter){
        if(req.query.offset)
            data = await Area.listAreasByFilter(req.query.offset,req.query.filter)
        else
            data = await Area.listAreasByFilter(0,req.query.filter)
    }else{
        if(req.query.offset)
            data = await Area.listAreas(req.query.offset)
        else
            data = await Area.listAreas(0)
    }
    res.jsonp(data)
});

module.exports = router;
