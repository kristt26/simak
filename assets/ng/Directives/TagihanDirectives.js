(function (angular) {
    'use strict'
    angular.module('TagihanDirectives', [])
        .factory("tagihankeuangan", ["$q", "AuthService", "$http", "$window", function ($q, AuthService, $http, $window) {
            var service = {};
            service.instance = false;
            service.data = [];

            function getAction() {
                var deferred = $q.defer();
                var settings = {
                    "async": true,
                    "crossDomain": true,
                    "url": "http://stimik.ip-dynamic.com:8081/keuangan/api/datas/read/ReadDataPembayaran.php?npm=" + $window.sessionStorage.getItem("Username"),
                    "method": "GET",
                    "headers": {}
                  }
                  
                  $.ajax(settings).done(function (response) {
                    service.message = response;
                    deferred.resolve(service.message);
                  });
                // $http({
                //     method: "GET",
                //     url: "http://stimik.ip-dynamic.com:8081/keuangan/api/datas/read/ReadDataPembayaran.php?npm=" + $window.sessionStorage.getItem("Username")
                // }).then(function (response) {
                //     service.message = response.data;
                //     deferred.resolve(service.message);
                // }, function (error) {
                //     // console.log(error);
                //     deferred.reject(error);
                // })
                return deferred.promise;
            }

            return { get: getAction};
        }]);
})(window.angular);