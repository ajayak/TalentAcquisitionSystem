(function () {
    'use strict';
    angular.module('app.demo')
        .config(['$urlRouterProvider', '$stateProvider', function ($urlRouterProvider, $stateProvider) {

            $stateProvider
                .state('demo', {
                    url: '/demo',
                    templateUrl: 'app/demo/index.html',
                    controller: 'demoCtrl',
                    controllerAs: 'vm',
                    title: 'Demo'
                });
        }]);
}());