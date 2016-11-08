var mongooserandom = require('mongoose-simple-random');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Question = new Schema({
    domain : String,
    question : String,
    ans : [{
        text : String,
        value : String
    }],
    trueAnswer : String
});
Question.plugin(mongooserandom);

var User = new Schema({
    username: String,
    password: String,
    test: {
        currenttest: {
            questionID: String,
            score: Number,
            total: Number
        },
        score: Number,
        total: Number
    },
    examen: {
        currentexam: {
            questionIndex: Number,
            questionID: String,
            questionDomain: String,
            score: Number,
            totalQuestions: Number
        },
        previousexam: [
            {
                score: Number,
                total: Number,
                domain: String,
                date: String
            }
        ],
        score: Number,
        total: Number
    },
    exam_flag: Number
});

mongoose.model('question', Question);
mongoose.model('user', User);
mongoose.connect("mongodb://gab:83KwbGCLIlkb@ds143717.mlab.com:43717/log4420");