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

mongoose.model('question', Question);
mongoose.connect("mongodb://gab:83KwbGCLIlkb@ds143717.mlab.com:43717/log4420");