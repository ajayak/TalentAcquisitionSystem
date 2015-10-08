// Configure database using mongoose
var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/test');

var db = mongoose.connection;

db.on('error', function (err) {
	console.log('connection error', err);
});

db.once('open', function () {
	console.log('connected.');
});

module.exports = db;