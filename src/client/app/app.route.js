(function () {
    'use strict';
    angular.module('app')
        .config(['$urlRouterProvider', '$stateProvider', function ($urlRouterProvider, $stateProvider) {
            $urlRouterProvider.otherwise('login');
        }]);
} ());