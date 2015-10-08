(function() {
    'use strict';

    angular.module('app', [
        // Angular modules
        'ui.router',
        'ngMessages',
        'restangular',
        'ngAnimate',

        // Custom modules
        'app.core',
        'app.widgets',
        'app.login',
        'app.dashboard',

        // 3rd Party Modules
        'ngMaterial',
        'angular-loading-bar'
    ]);

}());