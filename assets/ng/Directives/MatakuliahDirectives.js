(function(angular){
    'use strict'
    angular.module("MatakuliahDirective", [])
    .factory("MatakuliahService", function($q, AuthService, $http){
        var service = {};
            service.data = [];
            function getMatakuliah() {
                var deferred = $q.defer();
                $http({
                    method: "GET",
                    url: AuthService.Base+"api/Matakuliah/GetMatakuliah",
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
            return { getMatakuliah: getMatakuliah};
    });
})(window.angular);