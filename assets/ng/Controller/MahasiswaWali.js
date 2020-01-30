(function (angular) {
    'use strict'
    angular.module("MahasiswaWali", ["MahasiswaWaliDirective"])
    .controller("MahasiswaWaliController", function($scope, $http, WaliMahasiswa){
        $scope.DataWali = [];
        $scope.SearchText="";
        WaliMahasiswa.getMahasiswa().then(response => {
            $scope.DataWali = response;
        }, error => {
                console.log(error);
        })
    });
})(window.angular);