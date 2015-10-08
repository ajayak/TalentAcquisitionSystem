var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var candidateSchema = new Schema({
	firstname : String,
	lastname : String,
	email : String,
	contactno : String,
	domain : String,
	experience : String,
	comments : String,
	status : String
	// status: Unscheduled,Scheduled,Onhold,Delete
});

var Candidate = mongoose.model('Candidate', candidateSchema);

module.exports = Candidate;
