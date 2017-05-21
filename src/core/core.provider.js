/**
 * Created by emt on 21.05.2017.
 */
(function () {

    angular.module('angularjs-google-chart').provider('GoogleChart', ChartProviderFn);

    function ChartProviderFn() {

        this.setMapApiKey = function () {
            this.mapApiKey = arguments[0];
        };


        this.$get = function () {
            var self = this;
            return {
                mapApiKey: self.mapApiKey
            };
        };
    }
})();