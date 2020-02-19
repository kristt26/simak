(function (angular) {
    'use strict'
    angular.module('PengumumanDirectives', [])
    .factory("PengumumanService", function ($q, AuthService, $http) {
        var service = {};
        service.data = {};
        function postAction(item) {
            var deferred = $q.defer();
            $http({
                method: "POST",
                url: AuthService.Base+"api/Pengumuman/Simpan",
                data: item,
                headers: AuthService.Header
            }).then(function (response) {
                service.data = {};
                service.data = response.data.data;
                service.instance = true;
                deferred.resolve(service.data);
            }, function (error) {
                // console.log(error);
                deferred.reject(error);
            })
            return deferred.promise;
        }
        function getAction() {
            var deferred = $q.defer();
            $http({
                method: "GET",
                url: AuthService.Base+"api/Pengumuman/Ambil",
                headers: AuthService.Header
            }).then(function (response) {
                service.data = {};
                service.data = response.data.data;
                service.instance = true;
                deferred.resolve(service.data);
            }, function (error) {
                // console.log(error);
                deferred.reject(error);
            })
            return deferred.promise;
        }
        return { post: postAction, get: getAction};
    });
})(window.angular);