(function(angular){
    'use strict'
    angular.module("Prodi",[])
    .controller("ProdiController", ["$scope", function($scope){
        $scope.Testing ="Data Prodi";
    }])
    .controller("statusDaftarUlangController", function($scope, WaliMahasiswa){
        $scope.Testing ="Data Prodi";
        WaliMahasiswa.StatusDaftarUlang().then(res=>{
            console.log(res);
        })
    });
})(window.angular);