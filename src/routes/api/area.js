var express = require('express');
var router = express.Router();
var Area = require("../../controllers/area") 

router.get('/:id/aliases', async function(req, res) {
    var data = await Area.getAliases(req.params.id)
    res.jsonp(data)
});

router.get('/:id/urls', async function(req, res) {
    var data = await Area.getURLs(req.params.id)
    res.jsonp(data)
});

router.get('/:id/parts', async function(req, res) {
    var data = await Area.getParts(req.params.id)
    res.jsonp(data)
});

router.get('/:id/partOf', async function(req, res) {
    var data = await Area.getPartOf(req.params.id)
    res.jsonp(data)
});

router.get('/:id', async function(req, res) {
    var data = await Area.getArea(req.params.id)
    res.jsonp(data)
});

router.get('/', async function(req, res) {
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
