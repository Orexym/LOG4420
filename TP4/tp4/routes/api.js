var express = require('express');
var router = express.Router();

var md5 = require('md5');
var server_functions = require('../lib/server_functions');

var mongoose = require('mongoose');
var Question = mongoose.model('question');
var User = mongoose.model('user');

// Get nb questions
router.get('/questionCount/:domain', function(req, res, next) {

    Question.find({domain : req.params.domain.toUpperCase()}, function(err) {
        if(err) {
            console.log("Could not find questions in questionCount");
            console.log("Error " + err);
            res.sendStatus(500);
        }
    }).count(function(err, count) {
        if(err) {
            console.log("Could not count questions in questionCount");
            console.log("Error " + err);
            res.sendStatus(500);
        }
        res.status(200).json( { count: count } );
    });
    
});

// configure exam
router.put('/configureExam', function(req, res, next) {

    User.findOne({}, function(err, user) {
        if(err) {
            console.log("Could not find user in configureExam");
            console.log("Error " + err);
            res.sendStatus(500);
        } else {
            User.update( {_id : user._id }, {
                $set : {
                    'exam_flag' : 1,
                    'examen.currentexam.score' : 0,
                    'examen.currentexam.questionIndex' : 0,
                    'examen.currentexam.questionDomain' : req.body.domain.toUpperCase(),
                    'examen.currentexam.totalQuestions' : parseInt(req.body.totalQuestions)
                }
            }, function(err) {
                if(err) {
                    console.log("Could not update user in configureExam");
                    console.log("Error " + err);
                    res.sendStatus(500);
                }
                res.sendStatus(200);
            });
            
            
        }
    });
});

// validate question
router.post('/validation', function(req, res, next) {
    
    User.findOne({}, function(err, user) {
        if(err) {
            console.log("Could not find user in validation");
            console.log("Error " + err);
            res.sendStatus(500);
        } else {
    
            var qid;
            if(user.exam_flag == 1) {
                qid = user.examen.currentexam.questionID;
            } else {
                qid = user.test.currenttest.questionID;
            }
            
            Question.findById(qid, function(err, oldQuestion) {
                if(err) {
                    console.log("Could not find old question in validation");
                    console.log("Error " + err);
                    res.sendStatus(500);
                } else {
                    
                    var score = 0;
                    if(oldQuestion.trueAnswer == req.body.attemptedAnswer) {
                        score = 1;
                    }
    
                    if(user.exam_flag == 1) {
                        User.findByIdAndUpdate( user._id, {
                            $inc : {
                                'examen.currentexam.score' : score
                            }
                        },{
                            new: true
                        }, function(err, newUser) {
                            if(err) {
                                console.log("Could not update user in validation");
                                console.log("Error " + err);
                                res.sendStatus(500);
                            }
        
                            res.status(200).json( { n: newUser, goodAnswer: score } );
                        });
                    } else {
                        User.findByIdAndUpdate( user._id, {
                            $inc : {
                                'test.currenttest.score' : score
                            }
                        },{
                            new: true
                        }, function(err, newUser) {
                            if(err) {
                                console.log("Could not update user in test/validation");
                                console.log("Error " + err);
                                res.sendStatus(500);
                            }
        
                            res.status(200).json( { n: newUser, goodAnswer: score } );
                        });
                    }
                    
                    
                }
            });
        }
    });
});

// new exam question
router.get('/exam/question', function(req, res, next) {
    
    User.findOne({}, function(err, user) {
        if(err) {
            console.log("Could not find user in exam/questions");
            console.log("Error " + err);
            res.sendStatus(500);
        } else {
            
            var domaine = user.examen.currentexam.questionDomain.toUpperCase();
            Question.findOneRandom({domain: domaine}, function(err, newQuestion) {
                if(err) {
                    console.log("Could not find new question in exam/questions");
                    console.log("Error " + err);
                    res.sendStatus(500);
                } else {
                    
                    User.findByIdAndUpdate( user._id, {
                        $set : {
                            'examen.currentexam.questionDomain' : domaine,
                            'examen.currentexam.questionID' : newQuestion._id
                        },
                        $inc : {
                            'examen.currentexam.questionIndex' : 1
                        }
                    },{
                        new: true
                    }, function(err, newUser) {
                        if(err) {
                            console.log("Could not update user in exam/questions");
                            console.log("Error " + err);
                            res.sendStatus(500);
                        }
                        
                        res.status(200).json( { q: newQuestion, n: newUser } );
                    });
                }
            });
        }
    });
    
});

// new test question
router.get('/test/question', function(req, res, next) {
    
    User.findOne({}, function(err, user) {
        if(err) {
            console.log("Could not find user in test/questions");
            console.log("Error " + err);
            res.sendStatus(500);
        } else {
            
            Question.findOneRandom(function(err, newQuestion) {
                if(err) {
                    console.log("Could not find new question in test/questions");
                    console.log("Error " + err);
                    res.sendStatus(500);
                } else {
                    
                    User.findByIdAndUpdate( user._id, {
                        $set : {
                            'test.currenttest.questionID' : newQuestion._id
                        },
                        $inc : {
                            'test.currenttest.total' : 1
                        }
                    },{
                        new: true
                    }, function(err, newUser) {
                        if(err) {
                            console.log("Could not update user in test/questions");
                            console.log("Error " + err);
                            res.sendStatus(500);
                        }
                        
                        res.status(200).json( { q: newQuestion, n: newUser } );
                    });
                }
            });
        }
    });
});

// finish exam
router.post('/exam/finish', function(req, res, next) {
    
    User.findOne({}, function(err, user) {
        if (err) {
            console.log("Could not find user in exam/finish");
            console.log("Error " + err);
            res.sendStatus(500);
        } else {
    
            var date = new Date().toLocaleDateString();
            User.findByIdAndUpdate(user._id, {
                $push: {
                    'examen.previousexam': {
                        'score': user.examen.currentexam.score,
                        'total': user.examen.currentexam.totalQuestions,
                        'domain': user.examen.currentexam.questionDomain,
                        'date': ""+date
                    }
                },
                $inc: {
                    'examen.score': user.examen.currentexam.score,
                    'examen.total': user.examen.currentexam.totalQuestions
                },
                $set: {
                    'exam_flag': 0
                }
            },{
                new: true
            }, function (err, newUser) {
                if (err) {
                    console.log("Could not push previous in exam/finish");
                    console.log("Error " + err);
                }
                res.status(200).json( { n: newUser } );
            });
        }
    });
});

// finish test
router.post('/test/finish', function(req, res, next) {
    User.findOne({}, function(err, user) {
        if (err) {
            console.log("Could not find user in test/finish");
            console.log("Error " + err);
            res.sendStatus(500);
        } else {
    
            User.findByIdAndUpdate(user._id, {
                $inc : {
                    'test.score' : user.test.currenttest.score,
                    'test.total' : user.test.currenttest.total
                },
                $set : {
                    'test.currenttest.score' : 0,
                    'test.currenttest.total' : 0
                }
            },{
                new: true
            }, function (err, newUser) {
                if (err) {
                    console.log("Could not update user in test/finish");
                    console.log("Error " + err);
                    res.sendStatus(500);
                }
                res.status(200).json( { n: newUser } );
        
            });
        }
    });
});

// add question
router.post('/question', function(req, res, next) {
    
    // some validation
    if(!server_functions.validateInput(req.body.question)
        && !server_functions.validateInput(req.body.domain)
        && !server_functions.validateInput(req.body.trueAnswer)
        && !server_functions.validateInput(req.body.ans)) {
        res.status(400).send("Fail validation"); // Gros fail
    }

    var question = server_functions.validateStringInput(req.body.question);
    var domain = server_functions.validateStringInput(req.body.domain).toUpperCase();
    var trueAnswer = server_functions.validateStringInput(req.body.trueAnswer);
    var answers = [];
    JSON.parse(req.body.ans).forEach(function(item, index) {
        answers.push(
            {
                text : server_functions.validateStringInput(item),
                value : md5(server_functions.validateStringInput(item))
            }
        );
    });
    
    // add to DB
    new Question({
        question: question,
        domain: domain,
        trueAnswer: answers[trueAnswer].value,
        ans: answers
    }).save(function(err) {
        if(err) {
            console.log("Could not add to Question DB");
            console.log("Error " + err);
            res.sendStatus(500);
        }
        res.status(200).send("1");// Réponse validée
    });
    
});

// resultats finaux
router.get('/resultatsFinaux', function(req, res, next) {
    User.findOne({}, function(err, user) {
        if (err) {
            console.log("Could not load profile");
            console.log("Error " + err);
            res.sendStatus(500);
        }
        res.status(200).json( {n:user} );
    });
});

// empty database
router.delete('/emptyQuestionDatabase', function(req, res, next) {
    Question.remove({}, function(err) {
        if(err) {
            console.log("Could not empty DB");
            console.log("Error " + err);
            res.sendStatus(500);
        } else {
            res.status(200).send("1");
        }
    });
});

// reset scores
router.delete('/resetScores', function(req, res, next) {
    User.findOne({}, function(err, user) {
        if (err) {
            console.log("Could not load profile");
            console.log("Error " + err);
            res.sendStatus(500);
        }
        User.findByIdAndUpdate(user._id,{
            $set : {
                'test.score' : 0,
                'test.total' : 0,
                'examen.score' : 0,
                'examen.total' : 0,
                'examen.previousexam' : []
            }
        },{
            new: true
        }, function(err, newUser) {
            if (err) {
                console.log("Could not load profile");
                console.log("Error " + err);
                res.sendStatus(500);
            }
            res.status(200).json( {n:newUser} );
        });
    });
});

// load profile
router.get('/load', function(req, res, next) {
   User.findOne({}, function(err, user) {
       if(err) {
           console.log("Could not load profile");
           console.log("Error " + err);
           res.sendStatus(500);
       }
       User.findByIdAndUpdate(user._id, {
           $set : {
               'test.currenttest.score' : 0,
               'test.currenttest.total' : 0,
               'test.currenttest.questionID' : ""
           }
       },{
           new: true
       }, function(err, newUser) {
           if(err) {
               console.log("Could not update profile");
               console.log("Error " + err);
               res.sendStatus(500);
           }
           res.status(200).json( {n : newUser} );
       });
   });
});

module.exports = router;