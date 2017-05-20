/**
 * Created by emt on 19.05.2017.
 */
(function () {

    angular.module('angularjs-google-chart').directive('googleChartSelect', GoogleChartEventFn);
    GoogleChartEventFn.$inject = ['GoogleChartConfig', '$log'];
    function GoogleChartEventFn(GoogleChartConfig, $log) {
        return {
            restrict: 'A',
            scope: false,
            require: "googleChart",
            link: function ($scope, $element, $attr, googleChartCtrl) {
                var event = GoogleChartConfig.events.SELECT;
                var methodStr = $attr['googleChartSelect'];
                if (!methodStr && methodStr === "")
                    throw 'Chart click cannot be empty';

                googleChartCtrl.chartReadyDefer.promise.then(function () {
                    var eventList = googleChartCtrl.chartModule.events;
                    if (eventList.indexOf(event.eventName) < 0)
                        $log.warn('Module:' + googleChartCtrl.chartModule.className + ' not have ' + event.eventName + ' event');
                    else
                        googleChartCtrl.strategyInstance.registerEvent(methodStr, event);
                });
            }
        }
    }
})();