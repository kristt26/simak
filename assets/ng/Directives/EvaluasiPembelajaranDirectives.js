(function (angular) {
    'use strict'
    angular.module('EvaluasiPembelajaranDirectives', [])
    .factory("EvaluasiPembelajaranService", function ($q, AuthService, $http) {
        var service = {};
        service.data = [];
        function getAction() {
            var deferred = $q.defer();
            $http({
                method: "get",
                url: AuthService.Base+"api/PeriodePenilaian/GetPeriodeAktif",
                headers: AuthService.Header
            }).then(function (response) {
                var a = response.data.data[0];
                var nm_periode = a.nm_period;
                $http({
                    method: "get",
                    url:  AuthService.Base+"api/Matakuliah/GetKrsm",
                    headers: AuthService.Header
                }).then(function (response) {
                    service.data = [];
                    var data = response.data.data;
                    angular.forEach(data, function (value, key) {
                        var Url =  AuthService.Base+"api/PenilaianDosen/GetPenilaiEvaluasi?thakademik=" + value.thakademik + "&gg=" + value.gg + "&period=" + nm_periode + "&npm=" + value.npm + "&kmk=" + value.kmk
                         $http({
                            method: "get",
                            url: Url,
                            headers: AuthService.Header
                        }).then(function (response) {
                            if (response.data.status == false) {
                                service.data.push(value);
                            }
    
                        })
                    })
                    deferred.resolve(service.data);
                }, function(error){
                    deferred.reject(error);
                });

            }, function(error){
                deferred.reject(error);
            })
            return deferred.promise;
        }
        function AmbilPeriode(){
            var deferred = $q.defer();
            $http({
                method: "get",
                url: AuthService.Base+"api/PeriodePenilaian/GetPeriodeAktif",
                headers: AuthService.Header
            }).then(function (response) {
                service.data = [];
                service.data = response.data.data
                deferred.resolve(service.data);
            }, function(error){
                deferred.reject(error);
            })
            return deferred.promise;
        }
        function AmbilPertanyaan(){
            var deferred = $q.defer();
            $http({
                method: "get",
                url: AuthService.Base+"api/Kompetensi/GetKompetensi",
                headers: AuthService.Header
            }).then(function (response) {
                service.data = [];
                service.data = response.data.data.Kompetensi
                deferred.resolve(service.data);
            }, function(error){
                deferred.reject(error);
            })
            return deferred.promise;
        }
        function SimpanData(item) {
            var deferred = $q.defer();
            $http({
                method: "POST",
                url: AuthService.Base+"api/PenilaianDosen/InsertPenilaiEvaluasi",
                headers: AuthService.Header,
                data: item
            }).then(function (response) {
                service.message = response.data.status;
                deferred.resolve(service.message);
            }, function (error) {
                deferred.reject(error);
            })
            return deferred.promise;
        }
        return { get: getAction, getPeriode: AmbilPeriode, getPertanyaan: AmbilPertanyaan, post: SimpanData};
    });
})(window.angular);