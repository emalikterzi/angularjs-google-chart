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
            ['Country', 'Population'],
            ['China', 'China: 1,363,800,000'],
            ['India', 'India: 1,242,620,000'],
            ['US', 'US: 317,842,000'],
            ['Indonesia', 'Indonesia: 247,424,598'],
            ['Brazil', 'Brazil: 201,032,714'],
            ['Pakistan', 'Pakistan: 186,134,000'],
            ['Nigeria', 'Nigeria: 173,615,000'],
            ['Bangladesh', 'Bangladesh: 152,518,015'],
            ['Russia', 'Russia: 146,019,512'],
            ['Japan', 'Japan: 127,120,000']
        ]
    }
    $scope.options = {
        showTooltip: true,
        showInfoWindow: true
    };
    $scope.onSelect = function () {
        console.log('on select', arguments)
    }


});