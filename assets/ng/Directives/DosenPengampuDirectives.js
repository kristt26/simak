(function (angular) {
    'use strict'
    angular.module('DosenPengampuDirectives', [])
        .factory('DosenAmpuServices', function ($q, AuthService, $http) {
            var service = {};
            service.data = [];
            function getAction(){
                var deferred = $q.defer();
                $http({
                    method: "GET",
                    url: AuthService.Base+"api/dosenampu/getdata",
                    headers: AuthService.Header
                }).then(function (response) {
                    service.data = [];
                    service.data = response.data;
                    service.instance = true;
                    deferred.resolve(service.data);
                }, function (error) {
                    // console.log(error);
                    deferred.reject(error);
                })
                return deferred.promise;
            }
            function postAction(param){
                var deferred = $q.defer();
                $http({
                    method: "POST",
                    url: AuthService.Base+"api/dosenampu/simpan",
                    headers: AuthService.Header,
                    data: param
                }).then(function (response) {
                    service.data.pengampu.push(response.data);
                    service.instance = true;
                    deferred.resolve(service.data);
                }, function (error) {
                    // console.log(error);
                    deferred.reject(error);
                })
                return deferred.promise;
            }
            function putAction(param){
                var deferred = $q.defer();
                $http({
                    method: "PUT",
                    url: AuthService.Base+"api/dosenampu/ubah",
                    headers: AuthService.Header,
                    data: param
                }).then(function (response) {
                    var data = service.data.pengampu.find(x=>x.idpengampu == param.idpengampu);
                    data = param;
                    // data.nidn = param.nidn;
                    // data.nm = param.nidn;
                    // data.kdps = param.kdps;
                    // data.kmk = param.kmk;
                    // data.thakademik = param.thakademik;
                    // data.gg = param.gg;
                    // data.iddosen = param.iddosen;
                    // data.idmatakuliah = param.idmatakuliah;
                    // data.jenis = param.jenis;
                    // data.mengajar = param.mengajar;
                    // data.idtahunakademik = param.idtahunakademik;
                    deferred.resolve(service.data);
                }, function (error) {
                    // console.log(error);
                    deferred.reject(error);
                })
                return deferred.promise;
            }
            return { get: getAction, post: postAction, put:putAction };
        })
})(window.angular);