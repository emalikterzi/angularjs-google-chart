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
            {label: 'x', type: 'number'},
            {label: 'values', type: 'number'},
            {id:'i1', type:'number', role:'interval'},
            {id:'i2', type:'number', role:'interval'},
            {id:'i2', type:'number', role:'interval'},
            {id:'i2', type:'number', role:'interval'},
            {id:'i2', type:'number', role:'interval'},
            {id:'i2', type:'number', role:'interval'}
        ],
        "rows": [
            [1, 100, 90, 110, 85, 96, 104, 120],
            [2, 120, 95, 130, 90, 113, 124, 140],
            [3, 130, 105, 140, 100, 117, 133, 139],
            [4, 90, 85, 95, 85, 88, 92, 95],
            [5, 70, 74, 63, 67, 69, 70, 72],
            [6, 30, 39, 22, 21, 28, 34, 40],
            [7, 80, 77, 83, 70, 77, 85, 90],
            [8, 100, 90, 110, 85, 95, 102, 110]
        ]
    };

    $scope.options = {
        title: 'Line intervals, default',
        curveType: 'function',
        lineWidth: 4,
        intervals: { 'style':'line' },
        legend: 'none'
    };


    $scope.onSelect = function () {
        console.log('on click', arguments)
    }
    $scope.onClick = function () {
        console.log('on select ', arguments)
    }
    $scope.val = 1;

    $scope.onReady = function () {
        console.log('on  ready', arguments);
    }

    $scope.mouseOver = function () {
        console.log('mouse over', arguments);
    }

    $scope.mouseOut = function () {
        console.log('mouse out', arguments);
    }

    $scope.animateFinish = function () {
        console.log('animate finish', arguments)
    }

});