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