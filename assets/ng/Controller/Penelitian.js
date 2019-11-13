(function (angular) {
    "use strict"
    angular.module("Penelitian",['PenelitianDirectives'])
    .controller("PenelitianController", function ($scope, $http, PenelitianService) {
        $scope.Cari = "";
        $scope.DatasPenelitian =[];
        $scope.DatasPublikasi =[];

        PenelitianService.getPenelitian().then(response => {
            $scope.DatasPenelitian= response;
            angular.forEach($scope.DatasPenelitian.riset, function(value, key){
                var str = value.berkas_riset.substring(31);
                value.strjudul = str.length;
            })
            angular.forEach($scope.DatasPenelitian.kp, function(value, key){
                var str = value.berkas_kp.substring(31);
                value.strjudul = str.length;
            })
        });
        PenelitianService.getPublikasi().then(response => {
            $scope.DatasPublikasi = response;
        })

    })
    
})(window.angular);