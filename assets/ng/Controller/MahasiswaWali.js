(function (angular) {
    'use strict'
    angular.module("MahasiswaWali", ["MahasiswaWaliDirective"])
    .controller("MahasiswaWaliController", function($scope, $http, WaliMahasiswa){
        $scope.DataWali = [];
        $scope.Init = function(){
            WaliMahasiswa.get().then(response=>{
                $scope.DataWali = response;
            });
        }
    });
})(window.angular);