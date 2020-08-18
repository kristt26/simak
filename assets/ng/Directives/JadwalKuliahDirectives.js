(function (angular) {
    'use strict'
    angular.module('JadwalKuliahDirectives', [])
        .factory("JadwalKuliah", ["$q", "AuthService", "$http", function ($q, AuthService, $http) {
            var service = {};
            service.instance = false;
            service.data = [];

            function getAction() {
                var deferred = $q.defer();
                var Url = AuthService.Base+"api/jadwal/jadwalprodi";
                $http({
                    method: "GET",
                    url: Url,
                    headers: AuthService.Header,
                }).then(function (response) {
                    service.instance = true;
                    service.data = response.data;
                    deferred.resolve(service.data);
                }, function (error) {
                    // console.log(error);
                    deferred.reject(error);
                })
                return deferred.promise;  
            }
            function getjadwal() {
                var deferred = $q.defer();
                var Url = AuthService.Base+"api/jadwal/jadwalkuliahall";
                $http({
                    method: "GET",
                    url: Url,
                    headers: AuthService.Header,
                }).then(function (response) {
                    service.instance = true;
                    service.jadwal = response.data;
                    deferred.resolve(service.jadwal);
                }, function (error) {
                    // console.log(error);
                    deferred.reject(error);
                })
                return deferred.promise;  
            }
            function postAction(param) {
                var deferred = $q.defer();
                var Url = AuthService.Base+"api/jadwal/tambahjadwal";
                $http({
                    method: "POST",
                    url: Url,
                    headers: AuthService.Header,
                    data:param
                }).then(function (response) {
                    service.data.jadwal.push(response.data);
                    deferred.resolve(service.jadwal);
                }, function (error) {
                    SweetAlert.swal("Approved!", error.data, "error");
                    deferred.reject(error);
                })
                return deferred.promise;  
            }
            return { get: getAction, post: postAction, getjadwal:getjadwal};
        }]);
})(window.angular);