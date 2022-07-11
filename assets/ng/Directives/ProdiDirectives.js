(function (angular) {
    'use strict'
    angular.module("ProdiDirectives", [])
    .factory("ProdiServices", ["$q", "AuthService", "$http", function ($q, AuthService, $http) {
        var service = {};
        service.instance = false;
        service.data = [];
        return { get: get, post:post, getByDosen:getByDosen};

        function get() {
            var deferred = $q.defer();
            $http({
                method: "get",
                url: AuthService.Base+"api/prodi/read",
                headers: AuthService.Header,
            }).then(function (response) {
                service.message = response.data.data;
                deferred.resolve(service.message);
            }, function (error) {
                // console.log(error);
                deferred.reject(error);
            })
            return deferred.promise;
        }

        function post(param) {
            var deferred = $q.defer();
            $http({
                method: "post",
                url: AuthService.Base+"api/dosen_wali/insert",
                data:param,
                headers: AuthService.Header,
            }).then(function (response) {
                service.message = response.data.data;
                deferred.resolve(service.message);
            }, function (error) {
                // console.log(error);
                deferred.reject(error);
            })
            return deferred.promise;
        }

        function getByDosen(param) {
            var deferred = $q.defer();
            $http({
                method: "post",
                url: AuthService.Base+"api/dosen_wali/read",
                data:param,
                headers: AuthService.Header,
            }).then(function (response) {
                service.message = response.data.data;
                deferred.resolve(service.message);
            }, function (error) {
                // console.log(error);
                deferred.reject(error);
            })
            return deferred.promise;
        }
    }]);
})(window.angular);