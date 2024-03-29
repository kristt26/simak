(function (angular) {
    'use strict'
    angular.module('KhsmDirectives', [])
        .factory('KhsmServicee', function ($q, AuthService, $http) {
            var service = {};
            service.data = [];
            function getAction(){
                var deferred = $q.defer();
                $http({
                    method: "GET",
                    url: AuthService.Base+"api/Khsm/GetlistKHS",
                    headers: AuthService.Header
                }).then(function (response) {
                    service.data = response.data.data;
                    service.instance = true;
                    deferred.resolve(service.data);
                }, function (error) {
                    // console.log(error);
                    deferred.reject(error);
                })
                return deferred.promise;
            }

            function getProgress(){
                var deferred = $q.defer();
                $http({
                    method: "GET",
                    url: AuthService.Base+"api/Khsm/progress",
                    headers: AuthService.Header
                }).then(function (response) {
                    deferred.resolve(response.data);
                }, function (error) {
                    // console.log(error);
                    deferred.reject(error);
                })
                return deferred.promise;
            }
            function getAll(){
                var deferred = $q.defer();
                $http({
                    method: "GET",
                    url: AuthService.Base+"api/Khsm/GetalllistKHS",
                    headers: AuthService.Header
                }).then(function (response) {
                    service.data = response.data.data;
                    deferred.resolve(service.data);
                }, function (error) {
                    // console.log(error);
                    deferred.reject(error);
                })
                return deferred.promise;
            }
            function putAction(item){
                var deferred = $q.defer();
                $http({
                    method: "PUT",
                    url: AuthService.Base+"api/Khsm/PutDetaiKHS",
                    data: item,
                    headers: AuthService.Header
                }).then(function (response) {
                    var data = {};
                    angular.forEach(service.data, function(itemdata, key){
                        if(itemdata.idjadwal==item.idjadwal)
                        data = itemdata;
                    })
                    if(data){
                        data.Mahasiswa.forEach(element => {
                            var dataitem = item.Mahasiswa.find(mhs=>mhs.npm == element.npm);
                            element.ket = dataitem.ket;
                            element.nxsks = dataitem.nxsks;
                            element.nhuruf = dataitem.nhuruf;
                        });
                    }
                    deferred.resolve(response.data);
                }, function (error) {
                    // console.log(error);
                    deferred.reject(error);
                })
                return deferred.promise;
            }
            return { get: getAction, put: putAction, getAll:getAll, getProgress:getProgress};
        })
})(window.angular);