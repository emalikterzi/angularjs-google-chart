/**
 * Created by emt on 18.05.2017.
 */


var app = angular.module('app', ['angularjs-google-chart']);

app.controller('TestController', function ($scope, $timeout, $interval) {

    $scope.chart = {
        rows: [
            ['Label', 'Value'],
            ['Memory', 80],
            ['CPU', 55],
            ['Network', 68]
        ]

    };
    $scope.options = {
        width: 400, height: 120,
        redFrom: 90, redTo: 100,
        yellowFrom:75, yellowTo: 90,
        minorTicks: 5
    };
    $timeout(function () {
        $scope.chart.rows =[
            ['Label', 'Value'],
            ['Memory', 55],
            ['CPU', 80],
            ['Network', 99]
        ]
    },2000)


});