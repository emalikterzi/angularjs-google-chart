/**
 * Created by emt on 19.05.2017.
 */
(function () {

    angular.module('angularjs-google-chart')
        .run(googleChartRun);

    googleChartRun.$inject = ['$rootScope', '$window', 'GoogleChartConfig', 'GoogleChartLoader'];
    function googleChartRun($rootScope, $window, GoogleChartConfig, GoogleChartLoader) {

        GoogleChartLoader.then(function () {
            angular.element($window).on('resize', function () {
                $rootScope.$emit(GoogleChartConfig.windowResizeEvent);
            });
        })

    }
})();