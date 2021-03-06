(function (angular) {
    'use strict'
    angular.module("MahasiswaWali", ["MahasiswaWaliDirective"])
    .controller("MahasiswaWaliController", function($scope, $http, WaliMahasiswa){
        $scope.DataWali = [];
        $scope.ListMonitoring = [];
        WaliMahasiswa.getMahasiswa().then(response => {
            $scope.DataWali = response;
        }, error => {
                console.log(error);
        });

        WaliMahasiswa.getList().then(response =>{
            $scope.ListMonitoring = response.data.data;
        });
    });
})(window.angular);