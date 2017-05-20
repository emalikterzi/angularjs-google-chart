/**
 * Created by emt on 20.05.2017.
 */
(function () {

    angular.module('angularjs-google-chart')
        .factory('DefaultEventListener', DefaultEventListenerFactoryFn);

    function DefaultEventListenerFactoryFn() {
        return DefaultEventListener;
    }

    function DefaultEventListener() {

    }

    DefaultEventListener.prototype.onSelect = function (methodStr) {
        var self = this;
        var fixedMethod = self.GoogleChartHelper.removeMethodAndAddParams(methodStr, ["x", "y"]);
        self.$scope.$apply(function () {
            self.$scope.$eval(fixedMethod, {x: self.chart.getSelection(), y: self.chart})
        })
    };

    DefaultEventListener.prototype.onDefault = function () {
        var self = this;
        var methodStr = arguments[0];
        var context = {};
        var paramList = [];
        for (var i = 1; i < arguments.length; i++) {
            var obj = arguments[i];
            if (obj) {
                var curent = "a" + (i - 1 + "").toString();
                context[curent] = obj;
                paramList.push(curent);
            }
        }
        context['chart'] = self.chart;
        paramList.push("chart");
        var fixedMethod = self.GoogleChartHelper.removeMethodAndAddParams(methodStr, paramList);
        self.$scope.$apply(function () {
            self.$scope.$eval(fixedMethod, context);
        })
    };

    // DefaultEventListener.prototype.onReady = function (methodStr) {
    //     var self = this;
    //     var fixedMethod = self.GoogleChartHelper.removeMethodAndAddParams(methodStr, null);
    //     self.$scope.$apply(function () {
    //         self.$scope.$eval(fixedMethod, null);
    //     })
    // };
    //
    // DefaultEventListener.prototype.onRangeChange = function (methodStr, $event) {
    //     var self = this;
    //     var fixedMethod = self.GoogleChartHelper.removeMethodAndAddParams(methodStr, "x");
    //     self.$scope.$apply(function () {
    //         self.$scope.$eval(fixedMethod, {"x": $event});
    //     })
    // };
    //
    // DefaultEventListener.prototype.onMouseOver = function (methodStr, $event) {
    //     var self = this;
    //     var fixedMethod = self.GoogleChartHelper.removeMethodAndAddParams(methodStr, "x");
    //     self.$scope.$apply(function () {
    //         self.$scope.$eval(fixedMethod, {"x": $event});
    //     })
    // };
    // DefaultEventListener.prototype.onMouseOut = function (methodStr, $event) {
    //     var self = this;
    //     var fixedMethod = self.GoogleChartHelper.removeMethodAndAddParams(methodStr, "x");
    //     self.$scope.$apply(function () {
    //         self.$scope.$eval(fixedMethod, {"x": $event});
    //     })
    // };
    //
    // DefaultEventListener.prototype.onAnimationFinish = function (methodStr, $event) {
    //     var self = this;
    //     var fixedMethod = self.GoogleChartHelper.removeMethodAndAddParams(methodStr, "x");
    //     self.$scope.$apply(function () {
    //         self.$scope.$eval(fixedMethod, {"x": $event});
    //     })
    // };
    //
    // DefaultEventListener.prototype.onClick = function (methodStr, $event) {
    //     var self = this;
    //     var fixedMethod = self.GoogleChartHelper.removeMethodAndAddParams(methodStr, "x");
    //     self.$scope.$apply(function () {
    //         self.$scope.$eval(fixedMethod, {"x": $event});
    //     })
    // }


})();