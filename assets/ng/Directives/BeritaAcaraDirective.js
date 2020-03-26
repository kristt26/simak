(function(angular){
    'use strict'
    angular.module("BeritaAcaraDirective", [])
    .factory("BaService", function($q, AuthService, $http){
        var service = {};
            service.data = [];
            function getlaporan() {
                var deferred = $q.defer();
                $http({
                    method: "GET",
                    url: AuthService.Base+"api/BeritaAcara/LaporanBa",
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

            function laporan() {
                var deferred = $q.defer();
                $http({
                    method: "GET",
                    url: AuthService.Base+"api/BeritaAcara/laporan",
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

            function persetujuan() {
                var deferred = $q.defer();
                $http({
                    method: "GET",
                    url: AuthService.Base+"api/BeritaAcara/Persetujuan",
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
            function ubahpersetujuan(item) {
                var deferred = $q.defer();
                $http({
                    method: "PUT",
                    url: AuthService.Base+"api/BeritaAcara/updateBaMengajar",
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
            function rekapBa() {
                var deferred = $q.defer();
                $http({
                    method: "PUT",
                    url: AuthService.Base+"api/BeritaAcara/Rekap",
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
            function HapusBa(item) {
                var deferred = $q.defer();
                $http({
                    method: "DELETE",
                    url: AuthService.Base+"api/BeritaAcara/HapusBa",
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
            function TambahBA(item) {
                var deferred = $q.defer();
                $http({
                    method: "POST",
                    url: AuthService.Base+"api/beritaacara/AddBaMengajar?akses=keuangan",
                    headers: AuthService.Header,
                    data: item
                }).then(function (response) {
                    service.message = response.data.data;
                    deferred.resolve(service.message);
                }, function (error) {
                    // console.log(error);
                    deferred.reject(error);
                })
                return deferred.promise;
            }
            return { getlaporan: getlaporan, getPersetujuan: persetujuan, putPersetujuan: ubahpersetujuan, putRekap: rekapBa, deleteBa: HapusBa, addBA: TambahBA, laporan:laporan};
    });
})(window.angular);