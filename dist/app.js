/**
 * Created by emt on 18.05.2017.
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

(function () {

    angular.module('angularjs-google-chart', []);

})();
/**
 * Created by emt on 19.05.2017.
 */


(function (x) {
    var GoogleChartConfig = {
        windowResizeEvent: '$$windowResizedGC',
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
            strategy: 'DefaultDataTableStrategy',
            className: 'AnnotationChart',
            events: ['rangechange', 'select', 'ready']
        },
        "Area": {
            moduleName: 'corechart',
            strategy: 'DefaultArrayToDataTable',
            className: 'AreaChart',
            events: ['animationfinish', 'select', 'ready', 'onmouseover', 'onmouseout', 'click']

        },
        "Bar": {
            moduleName: 'corechart',
            strategy: 'DefaultArrayToDataTable',
            className: 'BarChart',
            events: ['animationfinish', 'select', 'ready', 'onmouseover', 'onmouseout', 'click']
        },
        "Bubble": {
            moduleName: 'corechart',
            strategy: 'DefaultArrayToDataTable',
            className: 'BubbleChart',
            events: ['animationfinish', 'select', 'ready', 'onmouseover', 'onmouseout', 'click']
        },
        "Calendar": {
            moduleName: 'calendar',
            strategy: 'DefaultDataTableStrategy',
            className: 'Calendar',
            events: ['select', 'ready', 'onmouseover', 'onmouseout']
        },
        "Gantt": {
            moduleName: 'gantt',
            strategy: 'DefaultDataTableStrategy',
            className: 'Gantt',
            events: ['select', 'ready']
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
                    console.log('here2');
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

        var optionsLsitner =
            self.$scope.$watch(self.chartOptionsStr, function (n) {
                if (n && !angular.equals(self.chartOptions, n)) {
                    self.chartOptions = n;
                    self.drawAsync();
                }
            }, true);
        self.watcherList.push(optionsLsitner);
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
        self.watcherList.forEach(function (each) {
            console.log(each)
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

    // DefaultEventListener.prototype.onReady = function (methodStr) {
    //     var self = this;
    //     var fixedMethod = self.GoogleChartHelper.removeMethodAndAddParams(methodStr, null);
    //     self.$scope.$apply(function () {
    //         self.$scope.$eval(fixedMethod, null);
    //     })
    // };
    //
    // DefaultEventListener.prototype.onRangeChange = function (methodStr, $event) {
    //     var self = this;
    //     var fixedMethod = self.GoogleChartHelper.removeMethodAndAddParams(methodStr, "x");
    //     self.$scope.$apply(function () {
    //         self.$scope.$eval(fixedMethod, {"x": $event});
    //     })
    // };
    //
    // DefaultEventListener.prototype.onMouseOver = function (methodStr, $event) {
    //     var self = this;
    //     var fixedMethod = self.GoogleChartHelper.removeMethodAndAddParams(methodStr, "x");
    //     self.$scope.$apply(function () {
    //         self.$scope.$eval(fixedMethod, {"x": $event});
    //     })
    // };
    // DefaultEventListener.prototype.onMouseOut = function (methodStr, $event) {
    //     var self = this;
    //     var fixedMethod = self.GoogleChartHelper.removeMethodAndAddParams(methodStr, "x");
    //     self.$scope.$apply(function () {
    //         self.$scope.$eval(fixedMethod, {"x": $event});
    //     })
    // };
    //
    // DefaultEventListener.prototype.onAnimationFinish = function (methodStr, $event) {
    //     var self = this;
    //     var fixedMethod = self.GoogleChartHelper.removeMethodAndAddParams(methodStr, "x");
    //     self.$scope.$apply(function () {
    //         self.$scope.$eval(fixedMethod, {"x": $event});
    //     })
    // };
    //
    // DefaultEventListener.prototype.onClick = function (methodStr, $event) {
    //     var self = this;
    //     var fixedMethod = self.GoogleChartHelper.removeMethodAndAddParams(methodStr, "x");
    //     self.$scope.$apply(function () {
    //         self.$scope.$eval(fixedMethod, {"x": $event});
    //     })
    // }


})();
/**
 * Created by emt on 20.05.2017.
 */
(function () {
    angular.module('angularjs-google-chart').factory('DefaultArrayToDataTable', DefaultArrayToDataTableFactory);

    DefaultArrayToDataTableFactory.$inject = ['DefaultChartStrategy', 'GoogleChartHelper'];

    function DefaultArrayToDataTableFactory(DefaultChartStrategy, GoogleChartHelper) {
        GoogleChartHelper.extend(DefaultChartStrategy, DefaultArrayToDataTable);

        function DefaultArrayToDataTable() {
            DefaultChartStrategy.apply(this, arguments);
        }

        DefaultArrayToDataTable.prototype.setupData = function (rawData) {
            var self = this;
            var data = new self.google.visualization.arrayToDataTable(rawData.rows);
            if (rawData.dataView && rawData.dataView.cols) {
                var view = new google.visualization.DataView(data);
                view.setColumns(rawData.dataView.cols);
                return view;
            }
            return data;
        };


        return DefaultArrayToDataTable;
    }

})();
/**
 * Created by emt on 19.05.2017.
 */
(function () {
    angular.module('angularjs-google-chart').factory('DefaultDataTableStrategy', DefaultDataTableStrategyFactory);

    DefaultDataTableStrategyFactory.$inject = ['DefaultChartStrategy', 'GoogleChartHelper'];

    function DefaultDataTableStrategyFactory(DefaultChartStrategy, GoogleChartHelper) {
        GoogleChartHelper.extend(DefaultChartStrategy, DefaultDataTableStrategy);

        function DefaultDataTableStrategy() {
            DefaultChartStrategy.apply(this, arguments);
        }

        DefaultDataTableStrategy.prototype.setupData = function (rawData) {
            var self = this;
            var data = new self.google.visualization.DataTable();
            rawData.cols.forEach(function (each) {
                data.addColumn(each);
            });
            data.addRows(rawData.rows);
            return data;
        };

        DefaultDataTableStrategy.prototype.setupChart = function () {
            var self = this;
            this.chart = new this.google
                .visualization[self.chartModule.className](this.$element[0]);
            return this.chart;
        };
        return DefaultDataTableStrategy;
    }

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

    DefaultChartStrategy.prototype.setupData = function () {
        throw 'Must be implemented setupData';
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
 * Created by emt on 18.05.2017.
 */
(function () {

    angular.module('angularjs-google-chart')
        .controller('GoogleChartController', GoogleChartControllerFn);

    GoogleChartControllerFn.$inject = ['$scope', '$element', 'GoogleChartLoader',
        '$timeout', 'GoogleChartConstants', 'GoogleChartLoaderConfig', '$attrs', '$q',
        '$injector', '$parse', '$rootScope', 'GoogleChartConfig', 'GoogleChartHelper'];

    function GoogleChartControllerFn(x, y, z, x1, a, b, c, d, e, f, g, h, i) {
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
        self.google.charts.load(version, {
            packages: [self.chartModule.moduleName]
            , callback: function () {
                defer.resolve();
            }
        });
        return defer.promise;
    };
    GoogleChartControllerFn.prototype.initDataListener = function () {
        var self = this;
        var dataListenerClass = (self.$injector.get(self.chartModule.dataListener || "DefaultDataListener"));
        this.dataListenerInstance = new dataListenerClass(self.chartDataStr,
            self.chart,
            self.chartOptionsStr,
            self.strategyInstance,
            self.$scope, self.chartOptions, self.$q, self.$timeout);
        this.dataListenerInstance.listen();

    };

    GoogleChartControllerFn.prototype.setup = function () {

        var self = this;
        var strategyClass = (self.$injector.get(self.chartModule.strategy));
        var eventListenerClass = (self.$injector.get(self.chartModule.eventListener || "DefaultEventListener"));
        self.strategyInstance = new strategyClass(self.google, self.$element,
            self.$scope, self.GoogleChartConfig, self.GoogleChartHelper, self.chartModule, eventListenerClass);

        this.chart = self.strategyInstance.setupChart();
        self.chartReadyDefer.resolve(self.chart);
        self.strategyInstance.onChartReady(self.chart);
        self.initDataListener();

        var deregister
            = self.$rootScope
            .$on(self.GoogleChartConfig.windowResizeEvent, function () {
                self.drawChart()
            });

        self.$scope.$on('$destroy', function () {
            deregister();
            self.dataListenerInstance.destroy();
            self.strategyInstance.destroy();
        });

    }
})();
/**
 * Created by emt on 18.05.2017.
 */
(function () {

    angular.module('angularjs-google-chart').directive('googleChart', GoogleChartDirectiveFn);

    GoogleChartDirectiveFn.$inject = ['GoogleChartLoader' , '$q'];

    function GoogleChartDirectiveFn(GoogleChartLoader,  $q) {
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