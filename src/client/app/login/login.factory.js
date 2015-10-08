(function () {
	'use strict';

	angular.module('app.login').factory('login', demoFactory);

	function demoFactory(Restangular, URL, logger, $state, dashboard) {
		return {
			userCredentails: userCredentails,
			validateUser: validateUser
		};
		var userCredentails = {
			name: '',
			password: ''
		}
		function loginSuccess(data) {
			if (data != '0') {
				logger.info('Welcome ' + data);
				$state.go('dashboard');
			} else {
				logger.info('User does not Exist');
			}
		}
		function loginFailed(error) {
			logger.error(error);
		}


		function validateUser(user) {
			return Restangular.all(URL.VALIDATE_USER).post({ user }).then(loginSuccess, loginFailed);
		}

	}

} ());