(function (angular) {
    'use strict'
    angular.module('UserDirectives', [])
        .factory("AuthServiceUser", function ($window) {
            var service = {};
            service.Role = getRoles();
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
        .factory('UsersProses', function ($q, AuthServiceUser, $http, AuthService) {
            var service = {};
            service.instance = false;
            service.data = [];

            function postAction(item) {
                if (item.Username == undefined || item.Username=="") {
                    var deferred = $q.defer();
                    $http({
                        method: "POST",
                        url: AuthService.Base+"api/users/UbahPassword",
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
                } else {
                    var deferred = $q.defer();
                    $http({
                        method: "POST",
                        url: AuthService.Base+"api/users/UbahUsername",
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
            }
            function getProfile() {
                var deferred = $q.defer();
                $http({
                    method: "GET",
                    url: AuthService.Base+"api/profile/GetProfile?role=" + AuthServiceUser.Role,
                    headers: AuthService.Header
                }).then(function (response) {
                    service.data = [];
                    if(AuthServiceUser.Role=="Pegawai")
                    {
                        var a = JSON.parse(response.data.data);
                        service.data = angular.copy(a[0]);
                        var b = a[0];
                        service.data.TanggalLahir = new Date(b.TanggalLahir);
                        service.data.Role = AuthServiceUser.Role;
                        deferred.resolve(service.data);
                    }else{
                        var a = JSON.parse(response.data.data);
                        service.data = angular.copy(a[0]);
                        var b = a[0];
                        service.data.tgdaftar = new Date(b.tgdaftar);
                        service.data.tglhr = new Date(b.tglhr);
                        service.data.Role = AuthServiceUser.Role;
                        deferred.resolve(service.data);
                    }
                    
                }, function (error) {
                    service.data = [];
                    service.data=error.data;
                    deferred.resolve(service.data);
                })
                return deferred.promise;

            }
            function putAction(item) {
                var deferred = $q.defer();
                $http({
                    method: "PUT",
                    url: AuthService.Base+"api/profile/UpdateProfile",
                    headers: AuthService.Header,
                    data: item
                }).then(function (response) {
                    service.message = response.data.message;
                    deferred.resolve(service.message);
                }, function (error) {
                    deferred.reject(error);
                })
                return deferred.promise;
            }
            function insertAction(params) {
                var deferred = $q.defer();
                $http({
                    method: "POST",
                    url: AuthService.Base+"api/users/register",
                    headers: AuthService.Header,
                    data: params
                }).then(function (response) {
                    service.message = response.data.message;
                    deferred.resolve(service.message);
                }, function (error) {
                    deferred.reject(error);
                })
                return deferred.promise;
            }
            // getAction();
            return { post: postAction, getBiodata: getProfile, put: putAction, insert: insertAction };
        });
})(window.angular);