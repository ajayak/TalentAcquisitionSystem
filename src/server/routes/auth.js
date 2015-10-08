/// <reference path="../../../typings/express/express.d.ts" />
module.exports = function (app) {
	var passport = require('passport');
	var db = require('../data/db');

	app.post('/validate1', function (req, res) {
		console.log(req.body.user.name);
		res.send(req.body.user.name);
	});

	app.post('/validate', function (req, res) {
		var user = req.body.user.name;
		console.log(user);
		var collection = db.collection('authusers');
		collection.find({ name: user }).toArray(function (err, result) {
			if (err) {
				console.log(err);
				db.close();
			} else if (result.length) {
				console.log('Found:', result);
				res.send(result[0].name);
			} else {
				console.log('No document(s) found with defined "find" criteria!');
				res.send('0');
			}
		});
	});

	/* List applicants */
	app.post('/scheduled', function (req, res) {
		var collection = db.collection('candidates');
		collection.find({ status: "Unscheduled" }).toArray(function (err, result) {
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

	/* List applicants */
	app.post('/unscheduled', function (req, res) {
		var collection = db.collection('candidates');
		collection.find({ status: "scheduled" }).toArray(function (err, result) {
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

	/* List applicants */
	app.post('/list', function (req, res) {
		var collection = db.collection('applicants');
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

	/* GET Registration Page */
	app.get('/signup', function (req, res) {
		res.render('register', { message: req.flash('message') });
	});

	/* Handle Registration POST */
	app.post('/signup', passport.authenticate('signup', {
		successRedirect: '/home',
		failureRedirect: '/signup',
		failureFlash: true
	}));

	/* GET Home Page */
	app.get('/home', isAuthenticated, function (req, res) {
		console.log(req.body.user.name);
		res.send(req.body.user.name);
		res.send('Pong 123');
	});

	/* Handle Logout */
	app.get('/signout', function (req, res) {
		req.logout();
		res.redirect('/');
	});

	return app;
}

var isAuthenticated = function (req, res, next) {
	// if user is authenticated in the session, call the next() to call the next request handler
	// Passport adds this method to request object. A middleware is allowed to add properties to
	// request and response objects
	if (req.isAuthenticated())
		return next();
	// if the user is not authenticated then redirect him to the login page
	res.redirect('/');
}