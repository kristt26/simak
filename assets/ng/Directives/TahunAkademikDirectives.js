(function (angular) {
    'use strict'
    angular.module('TahunAkademikDirectives', [])
    .factory("TahunAkademikService", function ($q, AuthService, $http) {
        var service = {};
        service.data = {};
        function getAction(item) {
            var deferred = $q.defer();
            $http({
                method: "GET",
                url: AuthService.Base+"api/tahunakademik/getTaAktif",
                headers: AuthService.Header
            }).then(function (response) {
                service.data = {};
                service.data = response.data.data[0];
                service.instance = true;
                deferred.resolve(service.data);
            }, function (error) {
                // console.log(error);
                deferred.reject(error);
            })
            return deferred.promise;
        }
        return { get: getAction};
    });
})(window.angular);