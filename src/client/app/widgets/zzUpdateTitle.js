(function () {
    angular.module('app.widgets')
        .directive('zzUpdateTitle', updateTitle);

    function updateTitle($rootScope, $timeout) {
        // <title zz-update-title>Electronic Internal Auditing</title>
        // Updates the page title on browser title bar
        // Title need to be specified in route definition
        return {
            link: function (scope, element) {

                var listener = function (event, toState) {

                    var title = 'TAS';
                    if (toState.title) {
                        title = toState.title;
                    }

                    $timeout(function () {
                        element.text(title);
                    }, 0, false);
                };

                $rootScope.$on('$stateChangeSuccess', listener);
            }
        };
    }
    updateTitle.$inject = ['$rootScope', '$timeout'];
} ());