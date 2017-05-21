/**
 * Created by emt on 18.05.2017.
 */


var app = angular.module('app', ['angularjs-google-chart']);

app.controller('TestController', function ($scope, $timeout, $interval, GoogleChartService) {
    console.dir(GoogleChartService);

    $scope.chart = {
        rows: [
            ['Language', 'Speakers (in millions)'],
            ['Assamese', 13], ['Bengali', 83], ['Bodo', 1.4],
            ['Dogri', 2.3], ['Gujarati', 46], ['Hindi', 300],
            ['Kannada', 38], ['Kashmiri', 5.5], ['Konkani', 5],
            ['Maithili', 20], ['Malayalam', 33], ['Manipuri', 1.5],
            ['Marathi', 72], ['Nepali', 2.9], ['Oriya', 33],
            ['Punjabi', 29], ['Sanskrit', 0.01], ['Santhali', 6.5],
            ['Sindhi', 2.5], ['Tamil', 61], ['Telugu', 74], ['Urdu', 52]
        ]
    };
    $scope.options = {
        title: 'Indian Language Use',
        legend: 'none',
        pieSliceText: 'label',
        slices: {
            4: {offset: 0.2},
            12: {offset: 0.3},
            14: {offset: 0.4},
            15: {offset: 0.5}
        }
    };

    $timeout(function () {
        GoogleChartService.reDraw(13);
    }, 1000)

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


});