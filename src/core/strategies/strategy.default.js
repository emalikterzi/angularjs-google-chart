/**
 * Created by emt on 19.05.2017.
 */
(function () {

    angular.module('angularjs-google-chart').factory('DefaultChartStrategy', DefaultChartStrategyFactory);

    function DefaultChartStrategyFactory() {
        return DefaultChartStrategy;
    }

    function DefaultChartStrategy(google, element, scope, GoogleChartConfig, GoogleChartHelper, chartModule, eventListenerClass) {
        this.google = google;
        this.chart = null;
        this.$element = element;
        this.$scope = scope;
        this.listenerList = [];
        this.GoogleChartConfig = GoogleChartConfig;
        this.GoogleChartHelper = GoogleChartHelper;
        this.chartModule = chartModule;
        this.eventListenerClass = eventListenerClass;
    }

    DefaultChartStrategy.prototype.setupData = function (rawData) {
        var data;
        if (rawData.cols && rawData.rows && rawData.cols.length > 0) {
            data = new self.google.visualization.DataTable();
            rawData.cols.forEach(function (each) {
                data.addColumn(each);
            });
            data.addRows(rawData.rows);
        } else if ((!rawData.cols || rawData.cols.length === 0) && rawData.rows) {
            var firstDataStatus = !!rawData['firstRowAsData'];
            data = new self.google.visualization.arrayToDataTable(rawData.rows, firstDataStatus);
            if (rawData.dataView && rawData.dataView.cols) {
                var view = new google.visualization.DataView(data);
                view.setColumns(rawData.dataView.cols);
                return view;
            }
        }
        if (!data)
            throw 'data setup failed';
        return data;
    };

    DefaultChartStrategy.prototype.setupChart = function () {
        var self = this;
        this.chart = new this.google
            .visualization[self.chartModule.className](this.$element[0]);
        return this.chart;
    };

    DefaultChartStrategy.prototype.onChartReady = function (chart) {
        this.chart = chart;
    };

    DefaultChartStrategy.prototype.destroy = function () {
        var self = this;
        this.listenerList.forEach(function (each) {
            self.google.visualization.events.removeListener(each);
        })
    };
    DefaultChartStrategy.prototype.registerEvent = function (str, event) {
        var self = this;
        var eventListenerWrapper = new this.eventListenerClass(str, self.chart);
        var listener = self.google.visualization
            .events.addListener(self.chart, event.eventName, function () {
                var list = [str];
                if (arguments && arguments.length > 0) {
                    for (var i = 0; i < arguments.length; i++) {
                        var current = arguments[i];
                        if (current)
                            list.push(current);
                    }
                }
                eventListenerWrapper[event.eventMethod].apply(self, list);
            });
        self.listenerList.push(listener);
    };

})();