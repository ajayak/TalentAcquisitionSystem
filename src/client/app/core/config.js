(function () {
    'use strict';

    var core = angular.module('app.core');

    core.config(toastrConfig);
    core.config(configure);
    core.config(configRestangular);
    core.config(configInterpolate);

    core.constant('config', config);

    function toastrConfig(toastr) {
        toastr.options.timeOut = 4000;
        toastr.options.closeButton = true;
        toastr.options.positionClass = 'toast-bottom-right';
    }

    var config = {
        appErrorPrefix: '[TAS Error] ' //Configure the exceptionHandler decorator
    };

    function configure(
        $logProvider,
        exceptionConfigProvider, toastr) {
            
        configureToastr();
        configureLogging();
        configureExceptions();

        function configureToastr() {
            toastr.options.timeOut = 4000;
            toastr.options.positionClass = 'toast-bottom-right';
        }
        
        function configureLogging() {
            // turn debugging off/on (no info or warn)
            //TODO turn off debugging mode in production
            if ($logProvider.debugEnabled) {
                $logProvider.debugEnabled(true);
            }
        }

        function configureExceptions() {
            exceptionConfigProvider.config.appErrorPrefix = config.appErrorPrefix;
        }
    }

    function configRestangular(RestangularProvider, URL) {
        RestangularProvider.setBaseUrl(URL.BASE_URL);
        RestangularProvider.setDefaultHeaders({ 'Content-Type': 'application/json' });

        RestangularProvider.setErrorInterceptor(
            function (response, deferred) {
                if (response.status === 401 || response.status === 403) {
                    //$state.go('login');
                }
                //return $q.reject(response);
                /*
            TODO
            Check for Authentication and redirect to login page
            Add logging feature

            console.log("Error while making restangular request. Do something useful with it!");
            return false; // stop the promise chain
            */
            });
    }

    //Writes output of EVERYTHING on log
    function configInterpolate($provide) {
        $provide.decorator("$interpolate", function ($delegate) {
            var interpolateWrap = function () {
                var interpolationFn = $delegate.apply(this, arguments);
                if (interpolationFn) {
                    return interpolationFnWrap(interpolationFn, arguments);
                }
            };

            var interpolationFnWrap = function (interpolationFn, interpolationArgs) {
                return function () {
                    var result = interpolationFn.apply(this, arguments);
                    var log = result ? console.log : console.warn;
                    /*if (result.trim) {
                        log.call(console, "interpolation of  " + interpolationArgs[0].trim(), ":", result.trim());
                    }*/
                    return result;
                };
            };

            angular.extend(interpolateWrap, $delegate);
            return interpolateWrap;
        });
    }
} ());