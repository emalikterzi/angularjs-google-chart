/**
 * Created by emt on 18.05.2017.
 */
(function () {

    angular.module('angularjs-google-chart').provider('GoogleChartLoader', ChartProviderFn);

    function ChartProviderFn() {
        this.$get = function (GoogleChartHelper, $q, GoogleChartConfig) {
            var loaderUrl = 'https://www.gstatic.com/charts/loader.js';
            var promise = GoogleChartHelper.loadJs(loaderUrl);

            function scriptLoadCallback() {
                if (!google || !google.charts ||
                    typeof google.charts.setOnLoadCallback !== 'function') {
                    return $q.reject("Google charts library loader not present.");
                }
                var deferred = $q.defer();
                if (GoogleChartConfig.version && GoogleChartConfig.options && GoogleChartConfig.options.packages
                    && GoogleChartConfig.options.packages.length > 0) {
                    google.charts.load(GoogleChartConfig.version, GoogleChartConfig.options);
                    google.charts.setOnLoadCallback(function () {
                        deferred.resolve(google);
                    })
                } else {
                    deferred.resolve(google);
                }
                return deferred.promise;
            }

            return promise.then(scriptLoadCallback);
        };
        this.$get.$inject = ['GoogleChartHelper', '$q', 'GoogleChartConfig']
    }
})();