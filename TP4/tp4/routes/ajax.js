var express = require('express');
var router = express.Router();

var questions = require('../data/questions');

router.get('/domain=:domain', function(req, res, next) {
    var domain = req.params.domain.toUpperCase();
    var random = (Math.random() * questions[domain].length << 0);
    res.send(questions[domain][random]);
});

router.get('/test', function(req, res, next) {
    var keys = Object.keys(questions);
    var domain = keys[ keys.length * Math.random() << 0];
    var random = (Math.random() * questions[domain].length << 0);
    res.send(questions[domain][random]);
});

module.exports = router;




