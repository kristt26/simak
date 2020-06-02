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
                    "url": "https://www.keuangan.stimiksepnop.ac.id/api/datas/read/ReadDataPembayaran.php?npm=" + $window.sessionStorage.getItem("Username"),
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

            function Simpan(item) {
                var deferred = $q.defer();
                item.NPM = AuthService.dataUser.Username;
                var settings = {
                    "async": true,
                    "crossDomain": true,
                    "url": "https://keuangan.stimiksepnop.ac.id/api/datas/create/CreatePembayaranByMhs.php",
                    "method": "POST",
                    "headers": {
                        "content-type": "application/json"
                    },
                    "data": item
                }

                $.ajax(settings).done(function (response) {
                    service.message = response;
                    deferred.resolve(service.message);
                }, error(function (err) {
                    deferred.reject(err);
                }));

                // $http({
                //     method: "POST",
                //     url: "https://keuangan.stimiksepnop.ac.id/api/datas/create/CreatePembayaranByMhs.php",
                //     data: item
                // }).then(function (response) {
                //     service.message = response.data;
                //     deferred.resolve(service.message);
                // }, function (error) {
                //     // console.log(error);
                //     deferred.reject(error);
                // })
                return deferred.promise;
            }
            function TahunAkademik() {
                var deferred = $q.defer();
                $http({
                    method: "GET",
                    url: "https://keuangan.stimiksepnop.ac.id/api/datas/read/ReadTA.php",
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

            return { get: getAction, post: Simpan, GetTA: TahunAkademik };
        }]);
})(window.angular);