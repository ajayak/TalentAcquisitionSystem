(function () {
    'use strict';
    angular.module('app')
        .config(['$urlRouterProvider', '$stateProvider', function ($urlRouterProvider, $stateProvider) {
            $urlRouterProvider.otherwise('/');

            $stateProvider
                .state('home', {
                    url: '/',
                    template: '<h1>Go to Demo Page</h1> <a ui-sref="demo">Demo</a>',
                    controller: function(logger){
                       console.log(logger);
                       logger.info('Welcome');
                    },
                    // templateUrl: 'app/dashboard/dashboard.html',
                    title: 'Home'
                });
        }]);
}());