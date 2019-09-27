(function (angular) {
    'use strict'
    angular.module('HomeDirectives', [])
        .factory('AuthServiceHome', function ($window) {
            var service = {};
            service.Token = $window.sessionStorage.getItem("Token");
            service.Header = getHeader();
            service.Role = getRoles();
            
            function getHeader() {
                var header = {
                    "content-type": "application/json",
                    "authorization": service.Token
                }
                return header;
            }
            function getRoles() {
                var a = JSON.parse($window.sessionStorage.getItem("Role"));
                var statusRole =false;
                var role = "";
                angular.forEach(a, function (value, key) {
                    if (value.Nama == "Mahasiswa") {
                        statusRole = true;
                    }
                });
                if( statusRole == true)
                {
                    role = "Mahasiswa";
                }else{
                    role = "Pegawai";
                }
                return role;
            }
            return service;
        })

        .factory('HomeService', function ($http, $q, AuthServiceHome, AuthService) {
            var service = {};
            service.data = [];
            service.dataTA = [];
            function getAction() {
                var deferred = $q.defer();
                $http({
                    method: "GET",
                    url: AuthService.Base+"api/home/getHome?role=" + AuthServiceHome.Role,
                    headers: AuthServiceHome.Header,
                }).then(function (response) {
                    service.data = [];
                    service.data = response.data.data[0];
                    service.data.Role = AuthServiceHome.Role;
                    service.instance = true;
                    deferred.resolve(service.data);
                }, function (error) {
                    // console.log(error);
                    deferred.reject(error);
                })
                return deferred.promise;
            }
            function getTahunAkademik() {
                var deferred = $q.defer();
                $http({
                    method: "GET",
                    url: AuthService.Base+"api/tahunakademik/getTaAktif",
                    headers: AuthServiceHome.Header,
                }).then(function (response) {
                    service.dataTA = [];
                    service.dataTA = response.data.data[0];
                    service.instance = true;
                    deferred.resolve(service.dataTA);
                }, function (error) {
                    // console.log(error);
                    deferred.reject(error);
                })
                return deferred.promise;
            }
            function AmbilPenelitian() {
                var deferred = $q.defer();
                $http({
                    method: "GET",
                    url: AuthService.Base+"api/Penelitian/AmbilPenelitian",
                    headers: AuthServiceHome.Header,
                }).then(function (response) {
                    service.dataPenelitian = [];
                    service.dataPenelitian = response.data[0];
                    service.instance = true;
                    deferred.resolve(service.dataPenelitian);
                }, function (error) {
                    // console.log(error);
                    deferred.reject(error);
                })
                return deferred.promise;
            }

            return { get: getAction, getTA: getTahunAkademik, getPenelitian: AmbilPenelitian };
        })
})(window.angular);