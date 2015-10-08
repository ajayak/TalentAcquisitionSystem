var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var rejectedSchema = new Schema({
	id : String,
	comments : String,
	
});

var Rejected = mongoose.model('Rejected', rejectedSchema);

module.exports = Rejected;
