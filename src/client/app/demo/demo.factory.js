(function(){
	'use strict';
	
	angular.module('app.demo')
			.factory('demo', demoFactory);
			
	function demoFactory(Restangular, URL){
		return {
			getData: getData
		};
		
		function getData(){
			return Restangular.one(URL.PING).get();
		}	
	}
	
}());