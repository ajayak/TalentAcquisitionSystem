var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var InterviewerSchema = new Schema({
	id : String,
	InterviewerName : String,
	domain1: String
	
});

var Interviewer = mongoose.model('Interviewer', InterviewerSchema);

module.exports = Interviewer;
