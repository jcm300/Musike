var express = require('express');
var router = express.Router();
var Area = require("../controllers/area") 
var prettyPrint = require("./prettyPrint.js").prettyPrint

router.get('/:id/urls', async function(req, res) {
    var data = await Area.getURLs(req.params.id)
    res.jsonp(prettyPrint(data))
});

router.get('/:id/parts', async function(req, res) {
    var data = await Area.getParts(req.params.id)
    res.jsonp(prettyPrint(data))
});

router.get('/:id/partOf', async function(req, res) {
    var data = await Area.getPartOf(req.params.id)
    res.jsonp(prettyPrint(data))
});

router.get('/:id', async function(req, res) {
    var data = await Area.getArea(req.params.id)
    res.jsonp(prettyPrint(data))
});

router.get('/', async function(req, res) {
    var data = await Area.listAreas()
    res.jsonp(prettyPrint(data))
});

module.exports = router;
