/**
 * Created by emt on 18.05.2017.
 */


var app = angular.module('app', ['angularjs-google-chart']);

app.controller('TestController', function ($scope, $interval) {

    $scope.chart = {
        "cols": [
            {label: 'Date', type: 'date'},
            {label: 'Won/Loss', type: 'number'}
        ],
        "rows": [
            [ new Date(2012, 3, 13), 37032 ],
            [ new Date(2012, 3, 14), 38024 ],
            [ new Date(2012, 3, 15), 38024 ],
            [ new Date(2012, 3, 16), 38108 ],
            [ new Date(2012, 3, 17), 38229 ],
            // Many rows omitted for brevity.
            [ new Date(2013, 9, 4), 38177 ],
            [ new Date(2013, 9, 5), 38705 ],
            [ new Date(2013, 9, 12), 38210 ],
            [ new Date(2013, 9, 13), 38029 ],
            [ new Date(2013, 9, 19), 38823 ],
            [ new Date(2013, 9, 23), 38345 ],
            [ new Date(2013, 9, 24), 38436 ],
            [ new Date(2013, 9, 30), 38447 ]
        ]
    };
    $scope.options = {
        title: "Red Sox Attendance",
        height: 350,
    };

    $scope.mouseOver = function () {
        console.log('mouse over', arguments);
    }

    $scope.mouseOut = function () {
        console.log('mouse out', arguments);
    }

    $scope.onSelect = function () {
        console.log('select event', arguments)
    };

    $scope.onReady = function () {
        console.log('on ready', arguments);
    }

});