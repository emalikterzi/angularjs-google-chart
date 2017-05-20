/**
 * Created by emt on 19.05.2017.
 */


(function (x) {
    var GoogleChartConfig = {
        windowResizeEvent: '$$windowResizedGC',
        events: x.events
    };

    angular.module('angularjs-google-chart')
        .constant('GoogleChartConfig', GoogleChartConfig);
})(window['googleChartEvents$$']);