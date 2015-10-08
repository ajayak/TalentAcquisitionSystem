/// <reference path="../../../typings/express/express.d.ts" />
module.exports = function (app) {
	var Interviewer = require('../models/InterviewerModel');

	var db = require('../data/db');

	app.post('/addinterviewer', function (req, res) {
		var c = req.body.user;
		var interviewer = new Interviewer({
			InterviewerName: c.InterviewerName,
			id: c.id,
			domain1: c.domain1
		});

		interviewer.save(function (err) {
			if (err) {
				res.send(err);
				return err;
			}
			else {
				console.log("Interviewer saved successfully!");
				res.send('Interviewer added successfully!');
			}

		});
	});

	app.post('/listinterviewer', function (req, res) {
		var collection = db.collection('interviewers');
		collection.find().toArray(function (err, result) {
			if (err) {

				console.log(err);

			} else if (result.length) {
				console.log('Found:', result);
				res.send(result);
			} else {
				// db.close();
				console.log('No document(s) found with defined "find" criteria!');
				res.send('No Data Found');
			}
		});
	});
}
