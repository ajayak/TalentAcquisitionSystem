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
        'app.demo', 
        
        
        // 3rd Party Modules
        'ngMaterial',        
        'angular-loading-bar'
    ]);

}());