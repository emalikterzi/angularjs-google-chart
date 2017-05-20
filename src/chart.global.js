/**
 * Created by emt on 20.05.2017.
 */
window['googleChartEvents$$'] = {};
(function (x) {
    x.events = {
        ANIMATION_FINISH: {
            eventName: 'animationfinish',
            eventMethod: 'onDefault',
            directiveName: 'gceAnimationFinish'
        },
        ON_MOUSE_OUT: {
            eventName: 'onmouseout',
            eventMethod: 'onDefault',
            directiveName: 'gceOnMouseOut'
        },
        ON_MOUSE_OVER: {
            eventName: 'onmouseover',
            eventMethod: 'onDefault',
            directiveName: 'gceOnMouseOver'
        },
        RANGE_CHANGE: {
            eventName: 'rangechange',
            eventMethod: 'onDefault',
            directiveName: 'gceRangeChange'
        },
        CLICK: {
            eventName: 'click',
            eventMethod: 'onDefault',
            directiveName: 'gceClick'
        },
        SELECT: {
            eventName: 'select',
            eventMethod: 'onSelect',
            directiveName: 'gceSelect'
        },
        READY: {
            eventName: 'ready',
            eventMethod: 'onDefault',
            directiveName: 'gceReady'
        }
    }
})(window['googleChartEvents$$']);