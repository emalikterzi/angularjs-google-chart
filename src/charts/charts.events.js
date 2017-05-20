/**
 * Created by emt on 20.05.2017.
 */
(function (events) {
    for (var i in events) {
        var event = i;
        var eventObject = events[i];
        var directiveName = eventObject.directiveName;
        (function (event, eventObject, directiveName) {

            angular.module('angularjs-google-chart').directive(directiveName, eventDirectiveFn);
            eventDirectiveFn.$inject = ['$log'];

            function eventDirectiveFn($log) {
                return {
                    restrict: 'A',
                    scope: false,
                    require: "googleChart",
                    link: function ($scope, $element, $attr, googleChartCtrl) {
                        var event = eventObject;
                        var methodStr = $attr[directiveName];

                        if (!methodStr && methodStr === "")
                            $log.error(directiveName + ' cannot be empty');
                        else {
                            googleChartCtrl.chartReadyDefer.promise.then(function () {
                                var eventList = googleChartCtrl.chartModule.events;
                                if (eventList.indexOf(event.eventName) < 0)
                                    $log.warn('Module:' + googleChartCtrl.chartModule.className
                                        + ' not have ' + event.eventName + ' event');
                                else
                                    googleChartCtrl.strategyInstance.registerEvent(methodStr, event);
                            });
                        }
                    }
                }
            }
        })(event, eventObject, directiveName);
    }
})(window.googleChartEvents$$.events);