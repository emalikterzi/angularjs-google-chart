/**
 * Created by emt on 18.05.2017.
 */
(function () {

    var GoogleChartConstants = {

        "Annotation": {
            moduleName: 'annotationchart',
            strategy: 'DefaultDataTableStrategy',
            className: 'AnnotationChart',
            events: ['rangechange', 'select', 'ready']
        },
        "Area": {
            moduleName: 'corechart',
            strategy: 'DefaultArrayToDataTable',
            className: 'AreaChart',
            events: ['animationfinish', 'select', 'ready', 'onmouseover', 'onmouseout', 'click']

        },
        "Bar": {
            moduleName: 'corechart',
            strategy: 'DefaultArrayToDataTable',
            className: 'BarChart',
            events: ['animationfinish', 'select', 'ready', 'onmouseover', 'onmouseout', 'click']
        },
        "Bubble": {
            moduleName: 'corechart',
            strategy: 'DefaultArrayToDataTable',
            className: 'BubbleChart',
            events: ['animationfinish', 'select', 'ready', 'onmouseover', 'onmouseout', 'click']
        },
        "Calendar": {
            moduleName: 'calendar',
            strategy: 'DefaultDataTableStrategy',
            className: 'Calendar',
            events: ['select', 'ready', 'onmouseover', 'onmouseout']
        },
        "Gantt": {
            moduleName: 'gantt',
            strategy: 'DefaultDataTableStrategy',
            className: 'Gantt',
            events: ['select', 'ready']
        }
    };

    angular.module('angularjs-google-chart')
        .constant('GoogleChartConstants', GoogleChartConstants);

})();