/**
 * Created by emt on 18.05.2017.
 */


var app = angular.module('app', ['angularjs-google-chart']);

app.controller('TestController', function ($scope, $timeout, $interval) {

    $scope.chart = {
        rows: [
            ['Element', 'Density', {role: 'style'}],
            ['Copper', 8.94, '#b87333'],            // RGB value
            ['Silver', 10.49, 'silver'],            // English color name
            ['Gold', 19.30, 'gold'],
            ['Platinum', 21.45, 'color: #e5e4e2'] // CSS-style declaration
        ],
        dataView: {
            cols: [0, 1,
                {
                    calc: "stringify",
                    sourceColumn: 1,
                    type: "string",
                    role: "annotation"
                },
                2]
        }
    };
    $scope.options = {
        title: "Density of Precious Metals, in g/cm^3",
        width: 600,
        height: 400,
        bar: {groupWidth: "95%"},
        legend: {position: "none"},
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