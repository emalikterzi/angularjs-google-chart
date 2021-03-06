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