(function(){
	'use strict';

	angular.module('app.login')
		.controller('loginCtrl', loginController);

	function loginController(login, logger, demo){
		var vm = this;
		vm.message = 'Hello there!';
		vm.getData = callData;

		function dataRecieved(data){
			logger.success(data);
		}

		function dataError(error){
			logger.error(error);
		}

		function callData(){
			demo.getData().then(dataRecieved, dataError);
		}
	}

}());