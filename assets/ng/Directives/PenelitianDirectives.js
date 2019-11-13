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
        service.dataPublikasi = [];
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
        function AmbilPublikasi() {
            var deferred = $q.defer();
            $http({
                method: "GET",
                url: AuthService.Base+"api/Dosen/GetDosen",
                headers: AuthService.Header,
            }).then(function (response) {
                service.dataPublikasi = response.data.data;
                angular.forEach(service.dataPublikasi, function(value, key){
                    value.Publikasi = JSON.parse(angular.copy(value.Publikasi));
                })
                deferred.resolve(service.dataPublikasi);
            }, function (error) {
                // console.log(error);
                deferred.reject(error);
            })
            return deferred.promise;
        }
        return { getPenelitian: AmbilPenelitian, getPublikasi: AmbilPublikasi };
    });
    
})(window.angular);