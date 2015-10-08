(function () {
    'use strict';
    angular.module('app.dashboard')
        .config(['$urlRouterProvider', '$stateProvider', function ($urlRouterProvider, $stateProvider) {

            $stateProvider
                .state('dashboard', {
                    url: '/dashboard',
                    templateUrl: 'app/dashboard/index.html',
                    controller: 'dashboardCtrl',
                    controllerAs: 'vm',
                    title: 'Dashboard-HR-SPAN'
                });
        }]);
}());