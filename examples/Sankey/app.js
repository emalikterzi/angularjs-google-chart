/**
 * Created by emt on 18.05.2017.
 */


var app = angular.module('app', ['angularjs-google-chart']);

app.controller('TestController', function ($scope, $interval) {


    $scope.chart = {
        "cols": [
            {label: 'from', type: 'string'},
            {label: 'to', type: 'string'},
            {label: 'height', type: 'number'}
        ],
        "rows": [
            ['A', 'X', 5],
            ['A', 'Y', 7],
            ['A', 'Z', 6],
            ['B', 'X', 2],
            ['B', 'Y', 9],
            ['B', 'Z', 4]
        ]
    };

    $scope.options = {
        width: 600,
    };


    $scope.onSelect = function () {
        console.log('on select', arguments)
    }

    $scope.onReady = function () {
        console.log('on  ready', arguments);
    }

    $scope.mouseOver = function () {
        console.log('mouse over', arguments);
    }

    $scope.mouseOut = function () {
        console.log('mouse out', arguments);
    }


});