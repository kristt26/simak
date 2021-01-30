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
            function putAction(item){
                var deferred = $q.defer();
                $http({
                    method: "PUT",
                    url: AuthService.Base+"api/Khsm/PutDetaiKHS",
                    data: item,
                    headers: AuthService.Header
                }).then(function (response) {
                    var data = {};
                    service.data.forEach(itemdata => {
                        if(itemdata.idjadwal==item.idjadwal)
                            data = itemdata;
                    });
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
            return { get: getAction, put: putAction};
        })
})(window.angular);