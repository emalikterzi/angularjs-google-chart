/**
 * Created by emt on 20.05.2017.
 */
(function () {

    angular.module('angularjs-google-chart')
        .service('GoogleChartService', GoogleChartServiceFn);

    GoogleChartServiceFn.$inject = ['$rootScope', 'GoogleChartConfig'];
    function GoogleChartServiceFn($rootScope, GoogleChartConfig) {
        this.reDraw = reDraw($rootScope, GoogleChartConfig);
    }

    function reDraw(x, c) {
        return function (chartId) {
            x.$emit(c.reDrawEvent, chartId);
        }
    }

})();