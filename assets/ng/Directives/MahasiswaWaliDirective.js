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
        return { get: getAction};
    }]);
})(window.angular);