module.exports = function (app) {

	app.get('/ping', function (req, res) {
		res.send('Pong 123');
	});

}
