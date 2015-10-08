(function () {
	'use strict';

	angular.module('app.login')
		.controller('loginCtrl', loginController);

	function loginController(login, logger) {
		var vm = this;
		vm.message = 'Hello there!';

		function dataRecieved(data) {
			logger.success(data);
		}

		function dataError(error) {
			logger.error(error);
		}
	}

} ());