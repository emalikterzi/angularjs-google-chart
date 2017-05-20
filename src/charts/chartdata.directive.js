/**
 * Created by emt on 19.05.2017.
 */
(function () {

    angular.module('angularjs-google-chart').directive('googleChartData', GoogleChartDataDirectiveFn);

    GoogleChartDataDirectiveFn.$inject = ['$parse'];

    function GoogleChartDataDirectiveFn($parse) {
        return {
            restrict: 'A',
            scope: false,
            require: "googleChart",
            link: function ($scope, $element, $attr, googleChartCtrl) {
                var chartDataStr = $attr['googleChartData'];


                if (!chartDataStr && chartDataStr === "")
                    throw 'Chart data cannot be empty';

                googleChartCtrl.controllerReadyDefer.promise.then(function () {
                    var disable = $scope.$watch(chartDataStr, function (n) {
                        if (n) {
                            googleChartCtrl.dataInit(n,chartDataStr);
                            disable()
                        }
                    }, true)
                })

            }
        }
    }
})();