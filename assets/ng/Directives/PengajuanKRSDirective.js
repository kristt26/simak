(function (angular) {
    'use strict'
    angular.module('PengajuanKRSDirective', [])
        .factory("PengajuanService", ["$q", "AuthService", "$http", function ($q, AuthService, $http) {
            var service = {};
            // service.instance = false;
            service.data = [];
            function getAction() {
                var deferred = $q.defer();
                $http({
                    method: "GET",
                    url: AuthService.Base+"api/jadwal/jadwalmahasiswa",
                    headers: AuthService.Header
                }).then(function (response) {
                    service.data = [];
                    if (response.data.set == 'Jadwal') {
                        var a = JSON.parse(angular.copy(response.data.data.data));
                        response.data.data.data = a;
                        angular.forEach(response.data.data.data, function (value, key) {
                            value.status = true;
                            value.ngBinding = "";
                            // service.data.push(a);
                        });
                        service.data = response.data;
                        // service.instance = true;
                        deferred.resolve(service.data);
                    } else if (response.data.set == 'TemKrsm') {
                        var TemDetailKrsm = JSON.parse(angular.copy(response.data.data.data.TemDetailKrsm));
                        var TemKrsm = JSON.parse(angular.copy(response.data.data.data.TemKrsm));
                        response.data.data.data.TemDetailKrsm = TemDetailKrsm;
                        response.data.data.data.TemKrsm = TemKrsm;
                        service.data = response.data;
                        // service.instance = true;
                        deferred.resolve(service.data);
                    } else if (response.data.set == 'Krsm') {
                        var DetailKrsm = angular.copy(response.data.data.data.DetailKrsm);
                        var Krsm = angular.copy(response.data.data.data.Krsm);
                        response.data.data.data.DetailKrsm = DetailKrsm;
                        response.data.data.data.Krsm = Krsm;
                        service.data = response.data;
                        // service.instance = true;
                        deferred.resolve(service.data);
                    } else {
                        service.data = response.data;
                        // service.instance = true;
                        deferred.resolve(service.data);
                    }

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
                    service.message = response.data;
                    deferred.resolve(service.message);
                }, function (error) {
                    // console.log(error);
                    deferred.reject(error);
                })
                return deferred.promise;
            }
            function deleteAction(item) {
                var deferred = $q.defer();
                $http({
                    method: "DELETE",
                    url: AuthService.Base+"api/krsm/deleteitem",
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

            // getAction();
            return { get: getAction, post: postAction, delete: deleteAction };
        }]);
})(window.angular);