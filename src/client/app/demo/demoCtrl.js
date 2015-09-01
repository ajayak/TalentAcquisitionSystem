(function(){
	'use strict';
	
	angular.module('app.demo')
		.controller('demoCtrl', demoController);
		
	function demoController(demo, logger){
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