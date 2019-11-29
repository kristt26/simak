(function (angular) {
    'use strict'
    angular.module('KhsmDirectives', [])
        .factory('KhsmService', function ($q, AuthService, $http) {
            var service = {};
            service.data = [];
            function getAction(){
                var deferred = $q.defer();
                $http({
                    method: "GET",
                    url: AuthService.Base+"api/Khsm/GetlistKHS",
                    headers: AuthService.Header
                }).then(function (response) {
                    service.data = [];
                    service.data = response.data.data;
                    service.instance = true;
                    deferred.resolve(service.data);
                }, function (error) {
                    // console.log(error);
                    deferred.reject(error);
                })
                return deferred.promise;
            }
            function putAction(item){
                var deferred = $q.defer();
                $http({
                    method: "PUT",
                    url: AuthService.Base+"api/Khsm/PutDetaiKHS",
                    data: item,
                    headers: AuthService.Header
                }).then(function (response) {
                    service.data = [];
                    service.data = response.data.data;
                    service.instance = true;
                    deferred.resolve(service.data);
                }, function (error) {
                    // console.log(error);
                    deferred.reject(error);
                })
                return deferred.promise;
            }
            return { get: getAction, put: putAction};
        })
})(window.angular);