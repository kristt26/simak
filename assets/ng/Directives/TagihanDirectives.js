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
                    url: "http://stimik.ip-dynamic.com:8081/keuangan/api/datas/read/ReadDataPembayaran.php?npm=" + $window.sessionStorage.getItem("Username")
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