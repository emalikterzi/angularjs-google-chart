/**
 * Created by emt on 20.05.2017.
 */
(function () {

    angular.module('angularjs-google-chart').directive('googleChartRangeChange', GoogleChartEventFn);
    GoogleChartEventFn.$inject = ['GoogleChartConfig','$log'];
    function GoogleChartEventFn(GoogleChartConfig,$log) {
        return {
            restrict: 'A',
            scope: false,
            require: "googleChart",
            link: function ($scope, $element, $attr, googleChartCtrl) {
                var event = GoogleChartConfig.events.RANGE_CHANGE;
                var methodStr = $attr['googleChartRangeChange'];
                if (!methodStr && methodStr === "")
                    throw 'Chart Range Change cannot be empty';

                googleChartCtrl.chartReadyDefer.promise.then(function () {
                    var eventList = googleChartCtrl.chartModule.events;
                    if (eventList.indexOf(event.eventName) < 0)
                        $log.warn('Module:' + googleChartCtrl.chartModule.className + ' not have '+event.eventName+' event');
                    else
                        googleChartCtrl.strategyInstance.registerEvent(methodStr, event);
                });
            }
        }
    }
})();