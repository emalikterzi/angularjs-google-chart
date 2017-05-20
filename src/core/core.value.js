/**
 * Created by emt on 18.05.2017.
 */
(function () {
    var config = {
        version: "current",
        options: {
            packages: ["corechart"]
        }
    };
    angular.module('angularjs-google-chart')
        .value('GoogleChartLoaderConfig', config);
})();