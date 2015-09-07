(function(){
	'use strict';
	
	angular.module('app.login')
			.factory('login', loginFactory);
			
	function loginFactory(Restangular, URL){
		return {
			getData: getData
		};
		
		function getData(){
			return Restangular.one(URL.PING).get();
		}	
	}
	
}());