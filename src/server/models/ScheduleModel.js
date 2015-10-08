var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var scheduleSchema = new Schema({
	id : String,
	manager : String,
	date : String,
	time : String,

	 
	// status: Unscheduled,Scheduled,Onhold,Delete
});

var Schedule = mongoose.model('Schedule', scheduleSchema);

module.exports = Schedule;
