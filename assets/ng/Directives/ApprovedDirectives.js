(function (angular) {
    'use strict'
    angular.module('ApprovedDirectives', [])
        .factory("ApprovedService", ["$q", "AuthService", "$http", function ($q, AuthService, $http) {
            var service = {};
            service.instance = false;
            service.data = [];

            function getAction(item) {
                var deferred = $q.defer();
                $http({
                    method: "POST",
                    url: AuthService.Base+"api/krsm/getkrsmtem",
                    headers: AuthService.Header,
                    data: item
                }).then(function (response) {
                    service.data = [];
                    var a = JSON.parse(angular.copy(response.data.data));
                    response.data.data= a;
                    service.data = response.data;
                    service.instance = true;
                    deferred.resolve(service.data);
                }, function (error) {
                    // console.log(error);
                    deferred.reject(error);
                })
                return deferred.promise;
            }

            function postAction(item) {
                var deferred = $q.defer();
                $http({
                    method: "POST",
                    url: AuthService.Base+"api/krsm/pengajuanKRS",
                    headers: AuthService.Header,
                    data: item
                }).then(function (response) {
                    service.instance = true;
                    service.message = response.data;
                    deferred.resolve(service.message);
                }, function (error) {
                    // console.log(error);
                    deferred.reject(error);
                })
                return deferred.promise;
            }

            
            
            function putAction(item) {
                var deferred = $q.defer();
                $http({
                    method: "PUT",
                    url: AuthService.Base+"api/krsm/putkrsmtem",
                    headers: AuthService.Header,
                    data: item
                }).then(function (response) {
                    service.message = response.data;
                    deferred.resolve(service.message);
                }, function (error) {
                    console.log(error);
                    deferred.reject(error);
                })
                return deferred.promise;
            }
            return { get: getAction, post: postAction, put:putAction};
        }]);
})(window.angular);