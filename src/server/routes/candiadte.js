module.exports = function (app) {

	var Candidate = require('../models/CandidateModel');
	var Schedule = require('../models/ScheduleModel');
	var Rejected = require('../models/RejectedModel');
	//var Interviewer=require('../models/InterviewerModel');

	var db = require('../data/db');

	app.post('/addcandidate', function (req, res) {
		var c = req.body.user;
		var can = new Candidate({
			firstname: c.firstName,
			lastname: c.lastName,
			email: c.email,
			contactno: c.contact,
			domain: c.domain,
			experience: c.experience,
			comments: c.comments,
            status: 'Registered'

		});

		can.save(function (err) {
			if (err) {
				res.send(err);
				return err;
			}
			else {
				console.log("User saved successfully!");
				res.send('User saved successfully!');
			}

		});
	});

	function getNextSequence(name) {
		var ret = 0;
		db.collection('counters').update({ "_id": "userid" }, { $inc: { "seq": 1 } }
			);
		db.collection('counters').find({ _id: "userid" }).toArray(function (err, result) {
			if (err) {
				console.log(err);
			} else if (result.length) {
				console.log('Found:', result[0].seq);
				assign(result[0].seq);
			} else {
				// db.close();
				console.log('No document(s) found with defined "find" criteria!');
			}
		});
		function assign(data) {
			ret = data;
			return ret;
		}
	}

	app.post('/scheduleinterview', function (req, res) {
		var c = req.body.user;
		var can = new Schedule({
			id: c.uid,
			manager: c.manager,
			date: c.date,
			time: c.time,
		});

		can.save(function (err) {
			if (err) {
				res.send(err);
				return err;
			}
			else {
				db.collection('candidates').update({ "email": c.email }, { $set: { "status": "Scheduled" } }
					, function (err, results) {
						console.log(err);
						console.log(results);
					});
				console.log("User saved successfully!");
				res.send('Interview schedule successfully!');
			}
		});
	});

	app.post('/rejected', function (req, res) {
		var c = req.body.user;
		var rejected = new Rejected({
			id: c.uid,
			comments: c.comments
		});

		rejected.save(function (err) {
			if (err) {
				res.send(err);
				return err;
			}
			else {
				db.collection('candidates').update({ "email": c.email }, { $set: { "status": "Rejected" } }
					, function (err, results) {
						console.log(err);
						console.log(results);
					});
				console.log("User Rejected nnn successfully!");
				res.send('User Rejected successfully!');
			}
		});
	});


	app.post('/listcandidate', function (req, res) {
		var collection = db.collection('candidates');
		//Interviewer
		collection.find().toArray(function (err, result) {
			if (err) {
				console.log(err);

			} else if (result.length) {
				//console.log('Found:', result);
				res.send(result);
			} else {
				// db.close();
				console.log('No document(s) found with defined "find" criteria!');
				res.send('No Data Found');
			}
		});
	});
	
}
