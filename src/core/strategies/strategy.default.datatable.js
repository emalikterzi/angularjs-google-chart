/**
 * Created by emt on 19.05.2017.
 */
(function () {
    angular.module('angularjs-google-chart').factory('DefaultDataTableStrategy', DefaultDataTableStrategyFactory);

    DefaultDataTableStrategyFactory.$inject = ['DefaultChartStrategy', 'GoogleChartHelper'];

    function DefaultDataTableStrategyFactory(DefaultChartStrategy, GoogleChartHelper) {
        GoogleChartHelper.extend(DefaultChartStrategy, DefaultDataTableStrategy);

        function DefaultDataTableStrategy() {
            DefaultChartStrategy.apply(this, arguments);
        }
        DefaultDataTableStrategy.prototype.setupData = function (rawData) {
            var self = this;
            var data = new self.google.visualization.DataTable();
            rawData.cols.forEach(function (each) {
                data.addColumn(each);
            });
            data.addRows(rawData.rows);
            return data;
        };
        DefaultDataTableStrategy.prototype.setupChart = function () {
            var self = this;
            this.chart = new this.google
                .visualization[self.chartModule.className](this.$element[0]);
            return this.chart;
        };
        return DefaultDataTableStrategy;
    }

})();