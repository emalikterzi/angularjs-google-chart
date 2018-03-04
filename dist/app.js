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
        },
        REGION_CLICK: {
            eventName: 'regionClick',
            eventMethod: 'onDefault',
            directiveName: 'gceRegionClick'
        },
        COLLAPSE: {
            eventName: 'collapse',
            eventMethod: 'onDefault',
            directiveName: 'gceCollapse'
        }
    }
})(window['googleChartEvents$$']);
/**
 * Created by emt on 18.05.2017.
 */
(function () {

    angular.module('angularjs-google-chart', []);

})();
/**
 * Created by emt on 19.05.2017.
 */


(function (x) {
    var GoogleChartConfig = {
        windowResizeEvent: '$$windowResizedGC',
        reDrawEvent: '$$reDrawGC',
        events: x.events
    };

    angular.module('angularjs-google-chart')
        .constant('GoogleChartConfig', GoogleChartConfig);
})(window['googleChartEvents$$']);
/**
 * Created by emt on 18.05.2017.
 */
(function () {

    var GoogleChartConstants = {

        "Annotation": {
            moduleName: 'annotationchart',
            className: 'AnnotationChart',
            events: ['rangechange', 'select', 'ready']
        },
        "Area": {
            moduleName: 'corechart',
            className: 'AreaChart',
            events: ['animationfinish', 'select', 'ready', 'onmouseover', 'onmouseout', 'click']

        },
        "Bar": {
            moduleName: 'corechart',
            className: 'BarChart',
            events: ['animationfinish', 'select', 'ready', 'onmouseover', 'onmouseout', 'click']
        },
        "Bubble": {
            moduleName: 'corechart',
            className: 'BubbleChart',
            events: ['animationfinish', 'select', 'ready', 'onmouseover', 'onmouseout', 'click']
        },
        "Calendar": {
            moduleName: 'calendar',
            className: 'Calendar',
            events: ['select', 'ready', 'onmouseover', 'onmouseout']
        },
        "Candlestick": {
            moduleName: 'corechart',
            className: 'CandlestickChart',
            events: ['animationfinish', 'select', 'ready', 'onmouseover', 'onmouseout', 'click']
        },
        "Column": {
            moduleName: 'corechart',
            className: 'ColumnChart',
            events: ['animationfinish', 'select', 'ready', 'onmouseover', 'onmouseout', 'click']
        },
        "Combo": {
            moduleName: 'corechart',
            className: 'ComboChart',
            events: ['animationfinish', 'select', 'ready', 'onmouseover', 'onmouseout', 'click']
        },
        "Gantt": {
            moduleName: 'gantt',
            className: 'Gantt',
            events: ['select', 'ready']
        },
        "Gauge": {
            moduleName: 'gauge',
            className: 'Gauge'
        },
        "GeoChart": {
            moduleName: 'geochart',
            className: 'GeoChart',
            events: ['select', 'ready', 'regionClick']
        },
        "Histogram": {
            moduleName: 'corechart',
            className: 'Histogram',
            events: ['animationfinish', 'select', 'ready', 'onmouseover', 'onmouseout', 'click']
        },
        "Line": {
            moduleName: 'corechart',
            className: 'LineChart',
            events: ['animationfinish', 'select', 'ready', 'onmouseover', 'onmouseout', 'click']
        },

        "Map": {
            moduleName: 'map',
            className: 'Map',
            events: ['select']
        },
        "Org": {
            moduleName: 'orgchart',
            className: 'OrgChart',
            events: ['select', 'onmouseover', 'onmouseout', 'ready', 'collapse']
        },
        "Pie": {
            moduleName: 'corechart',
            className: 'PieChart',
            events: ['animationfinish', 'select', 'ready', 'onmouseover', 'onmouseout', 'click']
        },
        "Sankey": {
            moduleName: 'sankey',
            className: 'Sankey',
            events: ['select', 'ready', 'onmouseover', 'onmouseout']
        }
    };

    angular.module('angularjs-google-chart')
        .constant('GoogleChartConstants', GoogleChartConstants);

})();
/**
 * Created by emt on 18.05.2017.
 */
(function () {

    angular.module('angularjs-google-chart').factory('GoogleChartHelper', GoogleChartHelperFunc);

    GoogleChartHelperFunc.$inject = ['$document', '$q'];

    function GoogleChartHelperFunc($document, $q) {
        return {
            loadJs: function (url) {
                var deferred = $q.defer();
                var head = $document.find('head');
                var script = angular.element('<script></script>');

                script.attr('type', 'text/javascript');

                script.on('load', onLoad);
                script.on('error', onError);

                script.attr('src', url);
                head[0].appendChild(script[0]);
                function onLoad() {
                    deferred.resolve();
                }

                function onError() {

                    deferred.reject();
                }

                return deferred.promise;
            },
            removeMethodAndAddParams: function (methodStr, params) {
                var methodHolder = methodStr.split('(')[0] + "($params$)";
                if (params && params.length > 0) {
                    var paramsHolder = "";

                    for (var i = 0; i < params.length; i++) {
                        if (i === params.length - 1) {
                            paramsHolder += params[i];
                        } else {
                            paramsHolder += params[i] + ",";
                        }
                    }
                    methodHolder = methodHolder.replace("$params$", paramsHolder);
                } else {
                    methodHolder = methodHolder.replace("$params$", "");
                }
                return methodHolder;
            },
            extend: function (base, sub) {
                var origProto = sub.prototype;
                sub.prototype = Object.create(base.prototype);
                for (var key in origProto) {
                    sub.prototype[key] = origProto[key];
                }
                Object.defineProperty(sub.prototype, 'constructor', {
                    enumerable: false,
                    value: sub
                });
            }

        }
    }
})();
/**
 * Created by emt on 18.05.2017.
 */
(function () {

    angular.module('angularjs-google-chart').provider('GoogleChartLoader', ChartProviderFn);

    function ChartProviderFn() {
        this.$get = ["GoogleChartHelper", "$q", "GoogleChartLoaderConfig", function (GoogleChartHelper, $q, GoogleChartLoaderConfig) {
            var loaderUrl = 'https://www.gstatic.com/charts/loader.js';
            var promise = GoogleChartHelper.loadJs(loaderUrl);

            function scriptLoadCallback() {
                if (!google || !google.charts ||
                    typeof google.charts.setOnLoadCallback !== 'function') {
                    return $q.reject("Google charts library loader not present.");
                }
                var deferred = $q.defer();
                if (GoogleChartLoaderConfig.version && GoogleChartLoaderConfig.options
                    && GoogleChartLoaderConfig.options.packages
                    && GoogleChartLoaderConfig.options.packages.length > 0) {
                    google.charts.load(GoogleChartLoaderConfig.version, GoogleChartLoaderConfig.options);
                    google.charts.setOnLoadCallback(function () {
                        deferred.resolve(google);
                    })
                } else {
                    deferred.resolve(google);
                }
                return deferred.promise;
            }

            return promise.then(scriptLoadCallback);
        }];
        this.$get.$inject = ['GoogleChartHelper', '$q', 'GoogleChartLoaderConfig']
    }
})();
/**
 * Created by emt on 21.05.2017.
 */
(function () {

    angular.module('angularjs-google-chart').provider('GoogleChart', ChartProviderFn);

    function ChartProviderFn() {

        this.setMapApiKey = function () {
            this.mapApiKey = arguments[0];
        };


        this.$get = function () {
            var self = this;
            return {
                mapApiKey: self.mapApiKey
            };
        };
    }
})();
/**
 * Created by emt on 19.05.2017.
 */
(function () {

    angular.module('angularjs-google-chart')
        .run(googleChartRun);

    googleChartRun.$inject = ['$rootScope', '$window', 'GoogleChartConfig', 'GoogleChartLoader'];
    function googleChartRun($rootScope, $window, GoogleChartConfig, GoogleChartLoader) {

        GoogleChartLoader.then(function () {
            angular.element($window).on('resize', function () {
                $rootScope.$emit(GoogleChartConfig.windowResizeEvent);
            });
        })

    }
})();
/**
 * Created by emt on 20.05.2017.
 */
(function () {

    angular.module('angularjs-google-chart')
        .service('GoogleChartService', GoogleChartServiceFn);

    GoogleChartServiceFn.$inject = ['$rootScope', 'GoogleChartConfig'];
    function GoogleChartServiceFn($rootScope, GoogleChartConfig) {
        this.reDraw = reDraw($rootScope, GoogleChartConfig);
    }

    function reDraw(x, c) {
        return function (chartId) {
            x.$emit(c.reDrawEvent, chartId);
        }
    }

})();
/**
 * Created by emt on 18.05.2017.
 */
(function () {
    var config = {
        version: "current",
        options: {
            packages: ["corechart"]
        }
    };
    angular.module('angularjs-google-chart')
        .value('GoogleChartLoaderConfig', config);
})();
/**
 * Created by emt on 19.05.2017.
 */
(function () {

    angular.module('angularjs-google-chart').factory('DefaultChartStrategy', DefaultChartStrategyFactory);

    function DefaultChartStrategyFactory() {
        return DefaultChartStrategy;
    }

    function DefaultChartStrategy(google, element, scope, GoogleChartConfig, GoogleChartHelper, chartModule, eventListenerClass) {
        this.google = google;
        this.chart = null;
        this.$element = element;
        this.$scope = scope;
        this.listenerList = [];
        this.GoogleChartConfig = GoogleChartConfig;
        this.GoogleChartHelper = GoogleChartHelper;
        this.chartModule = chartModule;
        this.eventListenerClass = eventListenerClass;
    }

    DefaultChartStrategy.prototype.setupData = function (rawData) {
        var data;
        if (rawData.cols && rawData.rows && rawData.cols.length > 0) {
            data = new self.google.visualization.DataTable();
            rawData.cols.forEach(function (each) {
                data.addColumn(each);
            });
            data.addRows(rawData.rows);
        } else if ((!rawData.cols || rawData.cols.length === 0) && rawData.rows) {
            var firstDataStatus = !!rawData['firstRowAsData'];
            data = new self.google.visualization.arrayToDataTable(rawData.rows, firstDataStatus);
            if (rawData.dataView && rawData.dataView.cols) {
                var view = new google.visualization.DataView(data);
                view.setColumns(rawData.dataView.cols);
                return view;
            }
        }
        if (!data)
            throw 'data setup failed';
        return data;
    };

    DefaultChartStrategy.prototype.setupChart = function () {
        var self = this;
        this.chart = new this.google
            .visualization[self.chartModule.className](this.$element[0]);
        return this.chart;
    };

    DefaultChartStrategy.prototype.onChartReady = function (chart) {
        this.chart = chart;
    };

    DefaultChartStrategy.prototype.destroy = function () {
        var self = this;
        this.listenerList.forEach(function (each) {
            self.google.visualization.events.removeListener(each);
        })
    };
    DefaultChartStrategy.prototype.registerEvent = function (str, event) {
        var self = this;
        var eventListenerWrapper = new this.eventListenerClass(str, self.chart);
        var listener = self.google.visualization
            .events.addListener(self.chart, event.eventName, function () {
                var list = [str];
                if (arguments && arguments.length > 0) {
                    for (var i = 0; i < arguments.length; i++) {
                        var current = arguments[i];
                        if (current)
                            list.push(current);
                    }
                }
                eventListenerWrapper[event.eventMethod].apply(self, list);
            });
        self.listenerList.push(listener);
    };

})();
/**
 * Created by emt on 20.05.2017.
 */
(function () {

    angular.module('angularjs-google-chart')
        .factory('DefaultDataListener', DefaultDataListenerFn);

    function DefaultDataListenerFn() {
        return DefaultDataListener;
    }

    function DefaultDataListener(x, y, z, a, b, c, d, e) {
        this.chartDataStr = x;
        this.chart = y;
        this.chartOptionsStr = z;
        this.strategyInstance = a;
        this.$scope = b;
        this.chartOptions = c;
        this.data = null;
        this.watcherList = [];
        this.$q = d;
        this.initialDefer = this.$q.defer();
        this.$timeout = e;
    }

    DefaultDataListener.prototype.listen = function () {
        var self = this;
        var dataListener
            = self.$scope.$watch(self.chartDataStr, function (n) {
            if (n) {
                self.data = self.strategyInstance.setupData(n);
                self.drawAsync();
            }
        }, true);
        var optionsListener = self.$scope.$watch(self.chartOptionsStr, function (n) {
            if (n && !angular.equals(self.chartOptions, n)) {
                self.chartOptions = n;
                self.drawAsync();
            }
        }, true);
        self.watcherList.push(optionsListener);
        self.watcherList.push(dataListener);
        return self.initialDefer.promise;
    };
    DefaultDataListener.prototype.drawAsync = function () {
        var self = this;
        if (self.data) {
            self.$timeout(function () {
                self.chart.draw(self.data, self.chartOptions);
            })
        }
    };
    DefaultDataListener.prototype.destroy = function () {
        var self = this;
        self.watcherList.forEach(function (watcherFn) {
            if (watcherFn)
                watcherFn();
        })
    }
})();
/**
 * Created by emt on 20.05.2017.
 */
(function () {

    angular.module('angularjs-google-chart')
        .factory('DefaultEventListener', DefaultEventListenerFactoryFn);

    function DefaultEventListenerFactoryFn() {
        return DefaultEventListener;
    }

    function DefaultEventListener() {
    }

    DefaultEventListener.prototype.onSelect = function (methodStr) {
        var self = this;
        var fixedMethod = self.GoogleChartHelper.removeMethodAndAddParams(methodStr, ["x", "y"]);
        self.$scope.$apply(function () {
            self.$scope.$eval(fixedMethod, {x: self.chart.getSelection(), y: self.chart})
        })
    };
    DefaultEventListener.prototype.onDefault = function () {
        var self = this;
        var methodStr = arguments[0];
        var context = {};
        var paramList = [];
        for (var i = 1; i < arguments.length; i++) {
            var obj = arguments[i];
            if (obj) {
                var curent = "a" + (i - 1 + "").toString();
                context[curent] = obj;
                paramList.push(curent);
            }
        }
        context['chart'] = self.chart;
        paramList.push("chart");
        var fixedMethod = self.GoogleChartHelper.removeMethodAndAddParams(methodStr, paramList);
        self.$scope.$apply(function () {
            self.$scope.$eval(fixedMethod, context);
        })
    };
})();
/**
 * Created by emt on 18.05.2017.
 */
(function () {
    var defaultDataListener = 'DefaultDataListener';
    var defaultEventListener = 'DefaultEventListener';
    var defaultChartStrategy = 'DefaultChartStrategy';

    angular.module('angularjs-google-chart')
        .controller('GoogleChartController', GoogleChartControllerFn);
    GoogleChartControllerFn.$inject = ['$scope', '$element', 'GoogleChartLoader',
        '$timeout', 'GoogleChartConstants', 'GoogleChartLoaderConfig', '$attrs', '$q',
        '$injector', '$parse', '$rootScope', 'GoogleChartConfig', 'GoogleChartHelper', 'GoogleChart'];
    function GoogleChartControllerFn(x, y, z, x1, a, b, c, d, e, f, g, h, i, k) {
        this.$scope = x;
        this.$element = y;
        this.GoogleChartLoader = z;
        this.$timeout = x1;
        this.GoogleChartConstants = a;
        this.GoogleChartLoaderConfig = b;
        this.$attrs = c;
        this.$q = d;
        this.$injector = e;
        this.$parse = f;
        this.controllerReadyDefer = this.$q.defer();
        this.chartReadyDefer = this.$q.defer();
        this.$rootScope = g;
        this.GoogleChartConfig = h;
        this.GoogleChartHelper = i;
        this.initFlag = false;
        this.google = null;
        this.chartType = null;
        this.chartModule = null;
        this.strategyInstance = null;
        this.chartOptionsStr = null;
        this.chart = null;
        this.chartDataStr = null;
        this.chartId = new Date().getTime();
        this.GoogleChart = k;
        this.dataListenerCLASS = defaultDataListener;
        this.eventListenerCLASS = defaultEventListener;
        this.chartStrategyCLASS = defaultChartStrategy;
    }

    GoogleChartControllerFn.prototype.init = function () {
        var self = this;
        this.GoogleChartLoader.then(function (googleInstance) {
            self.google = googleInstance;
            self.chartType = self.$attrs['googleChart'];
            self.chartOptionsStr = self.$attrs['gcOptions'];
            self.controllerReadyDefer.resolve(self.google);
        })
    };
    GoogleChartControllerFn.prototype.dataInit = function (n, chartDataStr) {
        var self = this;
        self.chartDataStr = chartDataStr;
        if (self.initFlag === false && n) {
            self.initFlag = true;
            self.data = n;
            if (self.chartOptionsStr && self.chartOptionsStr !== "") {
                self.chartOptions = self.$parse(self.chartOptionsStr)(self.$scope);
            }
            self.determineChart();
        }
    };
    GoogleChartControllerFn.prototype.drawChart = function () {
        var self = this;
        if (self.dataListenerInstance) {
            self.dataListenerInstance.drawAsync();
        }
    };
    GoogleChartControllerFn.prototype.determineChart = function () {
        var self = this;
        if (!self.chartType || self.chartType.length <= 0) {

            if (!self.data.hasOwnProperty('type'))
                throw 'Couldnt determine chart type';
            else
                self.chartType = self.data['type'];
        }
        self.chartModule = self.GoogleChartConstants[self.chartType];
        if (!self.chartModule) {
            throw 'Unknown chart type';
        }
        self.load().then(function () {
            self.setup();
        })
    };
    GoogleChartControllerFn.prototype.load = function () {
        var self = this;
        var defer = self.$q.defer();
        var version = self.GoogleChartLoaderConfig.version;
        var options = {
            packages: [self.chartModule.moduleName]
            , callback: function () {
                defer.resolve();
            }
        };
        options = self.extraOptionJob(options);
        self.google.charts.load(version, options);
        return defer.promise;
    };

    GoogleChartControllerFn.prototype.extraOptionJob = function (opt) {
        var self = this;
        switch (self.chartModule.moduleName) {
            case "geochart":
            case "map":
                opt['mapsApiKey'] = self.GoogleChart.mapApiKey;
                break;
        }
        return opt;
    };

    GoogleChartControllerFn.prototype.initDataListener = function () {
        var self = this;
        var dataListenerClass = (self.$injector.get(self.dataListenerCLASS));
        this.dataListenerInstance = new dataListenerClass(self.chartDataStr,
            self.chart,
            self.chartOptionsStr,
            self.strategyInstance,
            self.$scope, self.chartOptions, self.$q, self.$timeout);
        this.dataListenerInstance.listen();

    };
    GoogleChartControllerFn.prototype.setup = function () {
        var self = this;
        var strategyClass = (self.$injector.get(self.chartStrategyCLASS));
        var eventListenerClass = (self.$injector.get(self.eventListenerCLASS));
        self.strategyInstance = new strategyClass(self.google, self.$element,
            self.$scope, self.GoogleChartConfig, self.GoogleChartHelper, self.chartModule, eventListenerClass);
        this.chart = self.strategyInstance.setupChart();
        self.chartReadyDefer.resolve(self.chart);
        self.strategyInstance.onChartReady(self.chart);
        self.initDataListener();
        var windowListener
            = self.$rootScope
            .$on(self.GoogleChartConfig.windowResizeEvent, function () {
                self.drawChart()
            });
        var reDrawListener = self.$rootScope
            .$on(self.GoogleChartConfig.reDrawEvent, function (event, data) {
                if (!data)
                    self.drawChart();
                else if (data && data == self.chartId) {
                    self.drawChart();
                }
            });

        self.$scope.$on('$destroy', function () {
            windowListener();
            reDrawListener();
            self.dataListenerInstance.destroy();
            self.strategyInstance.destroy();
        });

    }
})();
/**
 * Created by emt on 18.05.2017.
 */
(function () {

    angular.module('angularjs-google-chart').directive('googleChart', GoogleChartDirectiveFn)
        .directive('gcId', gcIdFn);

    GoogleChartDirectiveFn.$inject = ['GoogleChartLoader', '$q'];

    function GoogleChartDirectiveFn(GoogleChartLoader, $q) {
        return {
            restrict: 'A',
            scope: true,
            controller: 'GoogleChartController',
            compile: function ($element, $attr) {
                var defer = $q.defer();
                GoogleChartLoader.then(function (google) {
                    defer.resolve();
                });

                return function ($scope, $element, $attr, ctrl) {
                    defer.promise.then(function () {
                        ctrl.init();
                    })
                }
            }
        }
    }

    function gcIdFn() {
        return {
            restrict: 'A',
            scope: false,
            require: "googleChart",
            link: function ($scope, $element, $attr, googleChartCtrl) {
                googleChartCtrl.chartReadyDefer.promise.then(function () {
                    var id = $attr['gcId'];
                    if (id && id !== "") {
                        googleChartCtrl.chartId = id;
                    }
                });
            }
        }
    }
})();
/**
 * Created by emt on 19.05.2017.
 */
(function () {
    angular.module('angularjs-google-chart').directive('gcData', GoogleChartDataDirectiveFn);
    GoogleChartDataDirectiveFn.$inject = ['$parse'];
    function GoogleChartDataDirectiveFn($parse) {
        return {
            restrict: 'A',
            scope: false,
            require: "googleChart",
            link: function ($scope, $element, $attr, googleChartCtrl) {
                var chartDataStr = $attr['gcData'];
                if (!chartDataStr && chartDataStr === "")
                    throw 'Chart data cannot be empty';
                googleChartCtrl.controllerReadyDefer.promise.then(function () {
                    var disable = $scope.$watch(chartDataStr, function (n) {
                        if (n) {
                            googleChartCtrl.dataInit(n,chartDataStr);
                            disable()
                        }
                    }, true)
                })
            }
        }
    }
})();
/**
 * Created by emt on 20.05.2017.
 */
(function (events) {
    for (var i in events) {
        var event = i;
        var eventObject = events[i];
        var directiveName = eventObject.directiveName;
        (function (event, eventObject, directiveName) {

            angular.module('angularjs-google-chart').directive(directiveName, eventDirectiveFn);
            eventDirectiveFn.$inject = ['$log'];

            function eventDirectiveFn($log) {
                return {
                    restrict: 'A',
                    scope: false,
                    require: "googleChart",
                    link: function ($scope, $element, $attr, googleChartCtrl) {
                        var event = eventObject;
                        var methodStr = $attr[directiveName];

                        if (!methodStr && methodStr === "")
                            $log.error(directiveName + ' cannot be empty');
                        else {
                            googleChartCtrl.chartReadyDefer.promise.then(function () {
                                var eventList = googleChartCtrl.chartModule.events;
                                if (eventList.indexOf(event.eventName) < 0)
                                    $log.warn('Module:' + googleChartCtrl.chartModule.className
                                        + ' not have ' + event.eventName + ' event');
                                else
                                    googleChartCtrl.strategyInstance.registerEvent(methodStr, event);
                            });
                        }
                    }
                }
            }
        })(event, eventObject, directiveName);
    }
})(window.googleChartEvents$$.events);