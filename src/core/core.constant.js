/**
 * Created by emt on 18.05.2017.
 */
(function () {

    var GoogleChartConstants = {

        "Annotation": {
            moduleName: 'annotationchart',
            className: 'AnnotationChart',
            events: ['rangechange', 'select', 'ready']
        },
        "Area": {
            moduleName: 'corechart',
            className: 'AreaChart',
            events: ['animationfinish', 'select', 'ready', 'onmouseover', 'onmouseout', 'click']

        },
        "Bar": {
            moduleName: 'corechart',
            className: 'BarChart',
            events: ['animationfinish', 'select', 'ready', 'onmouseover', 'onmouseout', 'click']
        },
        "Bubble": {
            moduleName: 'corechart',
            className: 'BubbleChart',
            events: ['animationfinish', 'select', 'ready', 'onmouseover', 'onmouseout', 'click']
        },
        "Calendar": {
            moduleName: 'calendar',
            className: 'Calendar',
            events: ['select', 'ready', 'onmouseover', 'onmouseout']
        },
        "Candlestick": {
            moduleName: 'corechart',
            className: 'CandlestickChart',
            events: ['animationfinish', 'select', 'ready', 'onmouseover', 'onmouseout', 'click']
        },
        "Column": {
            moduleName: 'corechart',
            className: 'ColumnChart',
            events: ['animationfinish', 'select', 'ready', 'onmouseover', 'onmouseout', 'click']
        },
        "Combo": {
            moduleName: 'corechart',
            className: 'ComboChart',
            events: ['animationfinish', 'select', 'ready', 'onmouseover', 'onmouseout', 'click']
        },
        "Gantt": {
            moduleName: 'gantt',
            className: 'Gantt',
            events: ['select', 'ready']
        },
        "Gauge": {
            moduleName: 'gauge',
            className: 'Gauge'
        },
        "GeoChart": {
            moduleName: 'geochart',
            className: 'GeoChart',
            events: ['select', 'ready', 'regionClick']
        },
        "Histogram": {
            moduleName: 'corechart',
            className: 'Histogram',
            events: ['animationfinish', 'select', 'ready', 'onmouseover', 'onmouseout', 'click']
        },
        "Line": {
            moduleName: 'corechart',
            className: 'LineChart',
            events: ['animationfinish', 'select', 'ready', 'onmouseover', 'onmouseout', 'click']
        },

        "Map": {
            moduleName: 'map',
            className: 'Map',
            events: ['select']
        },
        "Org": {
            moduleName: 'orgchart',
            className: 'OrgChart',
            events: ['select', 'onmouseover', 'onmouseout', 'ready', 'collapse']
        },
        "Pie": {
            moduleName: 'corechart',
            className: 'PieChart',
            events: ['animationfinish', 'select', 'ready', 'onmouseover', 'onmouseout', 'click']
        },
        "Sankey": {
            moduleName: 'sankey',
            className: 'Sankey',
            events: ['select', 'ready', 'onmouseover', 'onmouseout']
        }
    };

    angular.module('angularjs-google-chart')
        .constant('GoogleChartConstants', GoogleChartConstants);

})();