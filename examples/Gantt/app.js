/**
 * Created by emt on 18.05.2017.
 */


var app = angular.module('app', ['angularjs-google-chart']);

app.controller('TestController', function ($scope, $interval) {

    function daysToMilliseconds(days) {
        return days * 24 * 60 * 60 * 1000;
    }

    $scope.chart = {
        "cols": [
            {label: 'Task ID', type: 'string'},
            {label: 'Task Name', type: 'string'},
            {label: 'Start Date', type: 'date'},
            {label: 'End Date', type: 'date'},
            {label: 'Duration', type: 'number'},
            {label: 'Percent Complete', type: 'number'},
            {label: 'Dependencies', type: 'string'}

        ],
        "rows": [
            ['Research', 'Find sources',
                new Date(2015, 0, 1), new Date(2015, 0, 5), null, 100, null],
            ['Write', 'Write paper',
                null, new Date(2015, 0, 9), daysToMilliseconds(3), 25, 'Research,Outline'],
            ['Cite', 'Create bibliography',
                null, new Date(2015, 0, 7), daysToMilliseconds(1), 20, 'Research'],
            ['Complete', 'Hand in paper',
                null, new Date(2015, 0, 10), daysToMilliseconds(1), 0, 'Cite,Write'],
            ['Outline', 'Outline paper',
                null, new Date(2015, 0, 6), daysToMilliseconds(1), 100, 'Research']
        ]
    };

    $scope.options = {
        height: 400,
        gantt: {
            criticalPathEnabled: false, // Critical path arrows will be the same as other arrows.
            arrow: {
                angle: 100,
                width: 5,
                color: 'green',
                radius: 0
            }
        }
    };


    $scope.onSelect = function () {
        console.log('select event', arguments)
    };

    $scope.onReady = function () {
        console.log('on ready', arguments);
    }

});