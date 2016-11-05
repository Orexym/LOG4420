var express = require('express');
var router = express.Router();

var md5 = require('md5');

var mongoose = require('mongoose');
var Question = mongoose.model('question');

var questions = require('../data/questions');

router.get('/questions/:domain', function(req, res, next) {
    var domaine = req.params.domain.toUpperCase();
    if(domaine == "NULL") {
        Question.findOneRandom(function(err, result) {
            if(err) { console.log("Error " + err); }
            res.status(200).send(result);
        });
    } else {
        Question.findOneRandom({domain: domaine}, function(err, result) {
            if(err) { console.log("Error " + err); }
            res.status(200).send(result);
        });
    }
});

// Get nb questions
router.get('/questionCount/:domain', function(req, res, next) {
     Question.find({domain : req.params.domain.toUpperCase()}, function(err) {
         if(err) { console.log("Error " + err); }
     }).count(function(err, count) {
         if(err) { console.log("Error " + err); }
         res.status(200).send(count+"");
     });
});

// request (validate + update score) -> reply (new question + updated score)

// add question
router.post('/questions', function(req, res, next) {
    
    // some validation
    if(!validateInput(req.body.question) && !validateInput(req.body.domain) && !validateInput(req.body.trueAnswer) && !validateInput(req.body.ans)) {
        res.status(400).send("Fail"); // Gros fail
    }

    var question = validateStringInput(req.body.question);
    var domain = validateStringInput(req.body.domain).toUpperCase();
    var trueAnswer = validateStringInput(req.body.trueAnswer);
    var answers = [];
    JSON.parse(req.body.ans).forEach(function(item, index) {
        answers.push(
            {
                text : validateStringInput(item),
                value : md5(item)
            }
        );
    });
    
    // add to DB
    new Question({
        question: question,
        domain: domain,
        trueAnswer: md5(answers[trueAnswer]),
        ans: answers
    }).save(function(err) {
        if(err) { console.log("Error " + err); }
    });
    
    res.status(200).send("Success");// Réponse validée
});

// empty database
router.delete('/emptyDatabase', function(req, res, next) {
    Question.remove({}, function(err) {
        if(err) { console.log("Error " + err); }
    });
    res.status(200).send("Success");
});

module.exports = router;