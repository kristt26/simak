(function (angular) {
    "use strict"
    angular.module("PenelitianDirectives",[])
    .factory('AuthServicePenelitian', function () {
        var service = {};
        service.Header = getHeader();
        function getHeader() {
            var header = {
                "content-type": "application/json"
            }
            return header;
        }
        return service;
    })
    .factory('PenelitianService', function ($http, $q, AuthServicePenelitian, AuthService) {
        var service = {};
        service.dataPenelitian = [];
        function AmbilPenelitian() {
            var deferred = $q.defer();
            $http({
                method: "GET",
                url: AuthService.Base+"api/Penelitian/AmbilPenelitian",
                headers: AuthService.Header,
            }).then(function (response) {
                service.dataPenelitian = response.data.data;
                deferred.resolve(service.dataPenelitian);
            }, function (error) {
                // console.log(error);
                deferred.reject(error);
            })
            return deferred.promise;
        }

        return { getPenelitian: AmbilPenelitian };
    });
    
})(window.angular);