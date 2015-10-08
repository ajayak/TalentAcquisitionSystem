(function () {
    'use strict';
    angular.module('app.login')
        .config(['$urlRouterProvider', '$stateProvider',  function ($urlRouterProvider, $stateProvider) {

            $stateProvider
                .state('login', {
                    url: '/login',
                    templateUrl: 'app/login/index.html',
                    controller: 'loginCtrl',
                    controllerAs: 'vm',
                    title: 'Login'
                });
        }]);
}());