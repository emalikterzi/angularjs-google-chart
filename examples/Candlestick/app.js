/**
 * Created by emt on 18.05.2017.
 */


var app = angular.module('app', ['angularjs-google-chart']);

app.controller('TestController', function ($scope, $timeout, $interval) {

    $scope.chart = {
        rows: [
            ['Mon', 20, 28, 38, 45],
            ['Tue', 31, 38, 55, 66],
            ['Wed', 50, 55, 77, 80],
            ['Thu', 77, 77, 66, 50],
            ['Fri', 68, 66, 22, 15]
        ],
        firstRowAsData: true
    };
    $scope.options = {
        legend: 'none',
        bar: { groupWidth: '100%' }, // Remove space between bars.
        candlestick: {
            fallingColor: { strokeWidth: 0, fill: '#a52714' }, // red
            risingColor: { strokeWidth: 0, fill: '#0f9d58' }   // green
        }
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