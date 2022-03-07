(function (angular) {
    'use strict'
    angular.module("MahasiswaWali", ["MahasiswaWaliDirective"])
        .controller("MahasiswaWaliController", function ($scope, $http, WaliMahasiswa) {
            $scope.DataWali = [];
            $scope.ListMonitoring = [];
            WaliMahasiswa.getMahasiswa().then(response => {
                $scope.DataWali = response;
                WaliMahasiswa.getList().then(response => {
                    $scope.ListMonitoring = response.data.data;
                });
            }, error => {
                console.log(error);
            });

            
        })
        .controller("mahasiswaProdiController", function ($scope, $http, WaliMahasiswa) {
            $scope.DataWali = [];
            $scope.ListMonitoring = [];
            WaliMahasiswa.mahasiswaProdi().then(response => {
                $scope.ListMonitoring = response.data.data.mahasiswa;
                $scope.DataWali = response.data.data.warning;
            });
            // WaliMahasiswa.getMahasiswa().then(response => {
            //     $scope.DataWali = response;
            // }, error => {
            //     console.log(error);
            // });
        });
})(window.angular);