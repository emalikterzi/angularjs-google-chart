/**
 * Created by emt on 18.05.2017.
 */


var app = angular.module('app', ['angularjs-google-chart']);

app.controller('TestController', function ($scope, $interval) {

    $scope.chart = {
        "cols": [
            {label: 'Date', type: 'date'},
            {label: 'Kepler-22b mission', type: 'number'},
            {label: 'Kepler title', type: 'string'},
            {label: 'Kepler text', type: 'string'},
            {label: 'Gliese 163 missione', type: 'number'},
            {label: 'Gliese title', type: 'string'},
            {label: 'Gliese text', type: 'string'}

        ],
        "rows": [
            [new Date(2314, 2, 15), 12400, undefined, undefined,
                10645, undefined, undefined],
            [new Date(2314, 2, 16), 24045, 'Lalibertines', 'First encounter',
                12374, undefined, undefined],
            [new Date(2314, 2, 17), 35022, 'Lalibertines', 'They are very tall',
                15766, 'Gallantors', 'First Encounter'],
            [new Date(2314, 2, 18), 12284, 'Lalibertines', 'Attack on our crew!',
                34334, 'Gallantors', 'Statement of shared principles'],
            [new Date(2314, 2, 19), 8476, 'Lalibertines', 'Heavy casualties',
                66467, 'Gallantors', 'Mysteries revealed'],
            [new Date(2314, 2, 20), 0, 'Lalibertines', 'All crew lost',
                79463, 'Gallantors', 'Omniscience achieved']
        ]
    }

    $scope.onSelect = function () {
        console.log('select event',arguments)
    };

    $scope.onReady = function () {
        console.log('on ready');
    }

    $scope.onRangeChange = function () {
        console.log('range change event', arguments);
    }


});