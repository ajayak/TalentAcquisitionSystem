(function () {

    'use strict';

    angular
        .module('app.core')
        .constant('toastr', toastr)
        .constant('URL', {
            'BASE_URL': 'http://localhost:7203/',
            'PING': 'ping'
        });
}());