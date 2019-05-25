var express = require('express');
var router = express.Router();
var Stats = require("../controllers/stats")
var auth = require("../auth/auth")

router.get('/more', auth.isAuthenticated, function(req, res) {
    Stats.getMoreRecordingsViews()
        .then(data => res.jsonp(data))
        .catch(error => res.status(500).jsonp(error))
});

router.get('/:id', auth.isAuthenticated, function(req, res) {
    Stats.getRecordingStats(req.params.id)
        .then(data => res.jsonp(data))
        .catch(error => res.status(500).jsonp(error))
});

router.get('/', auth.isAuthenticated, function(req, res) {
    Stats.getStats()
        .then(data => res.jsonp(data))
        .catch(error => res.status(500).jsonp(error))
});

router.post('/', auth.isAuthenticated, function(req, res) {
    Stats.createOrUpdate(req.body)
        .then(data => res.jsonp(data))
        .catch(error => res.status(500).jsonp(error))
});

module.exports = router;
