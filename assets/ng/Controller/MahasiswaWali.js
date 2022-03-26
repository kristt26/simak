(function (angular) {
    'use strict'
    angular.module("MahasiswaWali", ["MahasiswaWaliDirective"])
        .controller("MahasiswaWaliController", function ($scope, $http, WaliMahasiswa, $window) {
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

            $scope.showNilai=(item)=>{
                $window.open('https://www.simak1011.stimiksepnop.ac.id/transkip.php?npm='+item.npm, '_blank');
            }

            
        })
        .controller("mahasiswaProdiController", function ($scope, $http, WaliMahasiswa) {
            $scope.DataWali = [];
            $scope.ListMonitoring = [];
            WaliMahasiswa.mahasiswaProdi().then(response => {
                $scope.ListMonitoring = response.warning.data;
                $scope.DataWali = response.mahasiswa;
            });
            // WaliMahasiswa.getMahasiswa().then(response => {
            //     $scope.DataWali = response;
            // }, error => {
            //     console.log(error);
            // });
        });
})(window.angular);