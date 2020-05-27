(function (angular) {
    'use strict'
    angular.module('TagihanDirectives', [])
        .factory("tagihankeuangan", ["$q", "AuthService", "$http", "$window", function ($q, AuthService, $http, $window) {
            var service = {};
            service.instance = false;
            service.data = [];

            function getAction() {
                var deferred = $q.defer();
                $http({
                    method: "GET",
                    url: "http://s3.amazonaws.com/codecademy-content/courses/ltp4/forecast-api/forecast.json"
                }).then(function (response) {
                    service.message = response.data;
                    deferred.resolve(service.message);
                }, function (error) {
                    // console.log(error);
                    deferred.reject(error);
                })
                return deferred.promise;
            }

            return { get: getAction};
        }]);
})(window.angular);