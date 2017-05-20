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
            each();
        })
    }
})();