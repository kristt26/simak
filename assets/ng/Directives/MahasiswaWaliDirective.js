(function (angular) {
    'use strict'
    angular.module("MahasiswaWaliDirective", [])
    .factory("WaliMahasiswa", ["$q", "AuthService", "$http", function ($q, AuthService, $http) {
        var service = {};
        service.instance = false;
        service.data = [];

        function getAction() {
            var deferred = $q.defer();
            $http({
                method: "get",
                url: "http://localhost/RestSimak/api/Perwalian/MahasiswaWali",
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
        function AmbilMahasiswa() {
            var deferred = $q.defer();
            $http({
                method: "get",
                url: AuthService.Base+"api/MahasiswaWali",
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
        function getListDO() {
            var deferred = $q.defer();
            $http({
                method: "get",
                url: AuthService.Base+"api/MahasiswaMonitoring/getList",
                headers: AuthService.Header,
            }).then(function (response) {
                service.message = response.data;
                deferred.resolve(service.message);
            }, function (error) {
                // console.log(error);
                deferred.reject(error);
            })
            return deferred.promise;
        }

        function mahasiswaProdi() {
            var deferred = $q.defer();
            $http({
                method: "get",
                url: AuthService.Base+"api/MahasiswaMonitoring/mahasiswaProdi",
                headers: AuthService.Header,
            }).then(function (response) {
                service.message = response.data;
                deferred.resolve(service.message);
            }, function (error) {
                // console.log(error);
                deferred.reject(error);
            })
            return deferred.promise;
        }
        return { get: getAction, getMahasiswa: AmbilMahasiswa, getList: getListDO, mahasiswaProdi:mahasiswaProdi};
    }]);
})(window.angular);