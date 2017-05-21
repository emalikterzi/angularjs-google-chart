/**
 * Created by emt on 18.05.2017.
 */


var app = angular.module('app', ['angularjs-google-chart']);

app.controller('TestController', function ($scope, $interval) {



    $scope.chart = {
        "cols": [
            {label: 'Name', type: 'string'},
            {label: 'Manager', type: 'string'},
            {label: 'ToolTip', type: 'string'}
        ],
        "rows": [
            [{v: 'Mike', f: 'Mike<div style="color:red; font-style:italic">President</div>'},
                '', 'The President'],
            [{v: 'Jim', f: 'Jim<div style="color:red; font-style:italic">Vice President</div>'},
                'Mike', 'VP'],
            ['Alice', 'Mike', ''],
            ['Bob', 'Jim', 'Bob Sponge'],
            ['Carol', 'Bob', '']
        ]
    };

    $scope.options = {
        allowCollapse:true,
        allowHtml:true
    };


    $scope.onSelect = function () {
        console.log('on click', arguments)
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

    $scope.collapse = function () {
        console.log('collapse', arguments)
    }

});