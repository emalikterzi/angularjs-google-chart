/**
 * Created by emt on 18.05.2017.
 */
(function () {

    angular.module('angularjs-google-chart').directive('googleChart', GoogleChartDirectiveFn)
        .directive('gcId', gcIdFn);

    GoogleChartDirectiveFn.$inject = ['GoogleChartLoader', '$q'];

    function GoogleChartDirectiveFn(GoogleChartLoader, $q) {
        return {
            restrict: 'A',
            scope: true,
            controller: 'GoogleChartController',
            compile: function ($element, $attr) {
                var defer = $q.defer();
                GoogleChartLoader.then(function (google) {
                    defer.resolve();
                });

                return function ($scope, $element, $attr, ctrl) {
                    defer.promise.then(function () {
                        ctrl.init();
                    })
                }
            }
        }
    }

    function gcIdFn() {
        return {
            restrict: 'A',
            scope: false,
            require: "googleChart",
            link: function ($scope, $element, $attr, googleChartCtrl) {
                googleChartCtrl.chartReadyDefer.promise.then(function () {
                    var id = $attr['gcId'];
                    if (id && id !== "") {
                        googleChartCtrl.chartId = id;
                    }
                });
            }
        }
    }
})();