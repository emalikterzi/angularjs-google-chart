/**
 * Created by emt on 20.05.2017.
 */
(function () {
    angular.module('angularjs-google-chart').factory('DefaultArrayToDataTable', DefaultArrayToDataTableFactory);

    DefaultArrayToDataTableFactory.$inject = ['DefaultChartStrategy', 'GoogleChartHelper'];

    function DefaultArrayToDataTableFactory(DefaultChartStrategy, GoogleChartHelper) {
        GoogleChartHelper.extend(DefaultChartStrategy, DefaultArrayToDataTable);

        function DefaultArrayToDataTable() {
            DefaultChartStrategy.apply(this, arguments);
        }

        DefaultArrayToDataTable.prototype.setupData = function (rawData) {
            var self = this;
            var data = new self.google.visualization.arrayToDataTable(rawData.rows);
            if (rawData.dataView && rawData.dataView.cols) {
                var view = new google.visualization.DataView(data);
                view.setColumns(rawData.dataView.cols);
                return view;
            }
            return data;
        };


        return DefaultArrayToDataTable;
    }

})();