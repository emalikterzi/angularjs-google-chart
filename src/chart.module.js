/**
 * Created by emt on 18.05.2017.
 */
window['googleChartEvents$$'] = {};
(function (x) {
    x.events = {
        ANIMATION_FINISH: {
            eventName: 'animationfinish',
            eventMethod: 'onDefault',
            directiveName: 'googleChartAnimationFinish'
        },
        ON_MOUSE_OUT: {
            eventName: 'onmouseout',
            eventMethod: 'onDefault',
            directiveName: 'googleChartOnMouseOut'
        },
        ON_MOUSE_OVER: {
            eventName: 'onmouseover',
            eventMethod: 'onDefault',
            directiveName: 'googleChartOnMouseOver'
        },
        RANGE_CHANGE: {
            eventName: 'rangechange',
            eventMethod: 'onDefault',
            directiveName: 'googleChartRangeChange'
        },
        CLICK: {
            eventName: 'click',
            eventMethod: 'onDefault',
            directiveName: 'googleChartClick'
        },
        SELECT: {
            eventName: 'select',
            eventMethod: 'onSelect',
            directiveName: 'googleChartSelect'
        },
        READY: {
            eventName: 'ready',
            eventMethod: 'onDefault',
            directiveName: 'googleChartReady'
        }
    }
})(window['googleChartEvents$$']);

(function () {

    angular.module('angularjs-google-chart', []);

})();