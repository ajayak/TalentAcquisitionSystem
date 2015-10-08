//Require all route files
/// <reference path="../../../typings/express/express.d.ts" />

module.exports = function(app) {
	
	require('./ping')(app);
	require('./auth')(app);
	require('./candiadte')(app);
	require('./interviewer')(app);

};
