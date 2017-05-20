/**
 * Created by emt on 18.05.2017.
 */


var app = angular.module('app', ['angularjs-google-chart']);

app.controller('TestController', function ($scope, $timeout, $interval, GoogleChartService) {
    console.dir(GoogleChartService);

    $scope.chart = {
        rows: [
            ['Year', 'Sales', 'Expenses'],
            ['2013', 1000, 400],
            ['2014', 1170, 460],
            ['2015', 660, 1120],
            ['2016', 1030, 540]
        ]
    };
    $scope.options = {
        title: 'Company Performance',
        hAxis: {title: 'Year', titleTextStyle: {color: '#333'}},
        vAxis: {minValue: 0}
    };

    $timeout(function () {
        GoogleChartService.reDraw(13);
    },1000)

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