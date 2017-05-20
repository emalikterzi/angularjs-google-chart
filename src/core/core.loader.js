/**
 * Created by emt on 18.05.2017.
 */
(function () {

    angular.module('angularjs-google-chart').provider('GoogleChartLoader', ChartProviderFn);

    function ChartProviderFn() {
        this.$get = function (GoogleChartHelper, $q, GoogleChartLoaderConfig) {
            var loaderUrl = 'https://www.gstatic.com/charts/loader.js';
            var promise = GoogleChartHelper.loadJs(loaderUrl);

            function scriptLoadCallback() {
                if (!google || !google.charts ||
                    typeof google.charts.setOnLoadCallback !== 'function') {
                    return $q.reject("Google charts library loader not present.");
                }
                var deferred = $q.defer();
                if (GoogleChartLoaderConfig.version && GoogleChartLoaderConfig.options
                    && GoogleChartLoaderConfig.options.packages
                    && GoogleChartLoaderConfig.options.packages.length > 0) {
                    google.charts.load(GoogleChartLoaderConfig.version, GoogleChartLoaderConfig.options);
                    google.charts.setOnLoadCallback(function () {
                        deferred.resolve(google);
                    })
                } else {
                    console.log('here2');
                    deferred.resolve(google);
                }
                return deferred.promise;
            }

            return promise.then(scriptLoadCallback);
        };
        this.$get.$inject = ['GoogleChartHelper', '$q', 'GoogleChartLoaderConfig']
    }
})();