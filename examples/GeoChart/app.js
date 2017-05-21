/**
 * Created by emt on 18.05.2017.
 */


var app = angular.module('app', ['angularjs-google-chart']);

app.config(function (GoogleChartProvider) {
    GoogleChartProvider.setMapApiKey('AIzaSyCoFHYsdt6Os3sBNEa5C6A_xXbpx69sKdA');
})

app.controller('TestController', function ($scope, $timeout, $interval) {

    $scope.chart = {
        rows: [
            ['Country', 'Popularity'],
            ['Germany', 200],
            ['United States', 300],
            ['Brazil', 400],
            ['Canada', 500],
            ['France', 600],
            ['RU', 700]
        ]

    };

    $scope.chart2 = {
        rows: [
            ['City', 'Population', 'Area'],
            ['Rome', 2761477, 1285.31],
            ['Milan', 1324110, 181.76],
            ['Naples', 959574, 117.27],
            ['Turin', 907563, 130.17],
            ['Palermo', 655875, 158.9],
            ['Genoa', 607906, 243.60],
            ['Bologna', 380181, 140.7],
            ['Florence', 371282, 102.41],
            ['Fiumicino', 67370, 213.44],
            ['Anzio', 52192, 43.43],
            ['Ciampino', 38262, 11]
        ]
    }
    $scope.options = {};
    $scope.option2 = {
        region: 'IT',
        displayMode: 'markers',
        colorAxis: {colors: ['green', 'blue']}
    };

    $scope.onSelect = function () {
        console.log('on select', arguments)
    }

    $scope.onReady = function () {
        console.log('on  ready', arguments);
    }

    $scope.regionClick = function () {
        console.log('on  regionclick', arguments);
    }


});