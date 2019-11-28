(function (angular) {
    'use strict'
    angular.module('KemajuanStudiDirective', [])
        .factory("KhsmService", ["$q", "AuthService", "$http", function ($q, AuthService, $http) {
            var service = {};
            function getAction(item) {
                var deferred = $q.defer();
                $http({
                    method: "GET",
                    url: AuthService.Base+"api/krhm/GetKemajuanStudi?npm=" + item.npm,
                    headers: AuthService.Header,
                    //data: item
                }).then(function (response) {
                    service.data = {};
                    service.data = response.data;
                    service.instance = true;
                    deferred.resolve(service.data);
                }, function (error) {
                    // console.log(error);
                    deferred.reject(error);
                })
                return deferred.promise;
            }

           
            return { get: getAction};
        }]);
})(window.angular);