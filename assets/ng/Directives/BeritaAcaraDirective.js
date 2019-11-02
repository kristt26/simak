(function(angular){
    'use strict'
    angular.module("BeritaAcaraDirective", [])
    .factory("BaService", function($q, AuthService, $http){
        var service = {};
            service.data = [];
            function laporan() {
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
            return { getlaporan: laporan};
    });
})(window.angular);