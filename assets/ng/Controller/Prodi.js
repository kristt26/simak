(function(angular){
    'use strict'
    angular.module("Prodi",[])
    .controller("ProdiController", ["$scope", function($scope){
        $scope.Testing ="Data Prodi";
    }])
    .controller("statusDaftarUlangController", function($scope, WaliMahasiswa){
        $scope.Testing ="Data Prodi";
        WaliMahasiswa.StatusDaftarUlang().then(res=>{
            $scope.datas = res.data
            $scope.aktif = $scope.datas.filter(x=>x.stdu == 'AKTIF').length;
            $scope.proses = $scope.datas.filter(x=>x.status != null && x.stdu=='TIDAK AKTIF').length;
            $scope.belum = $scope.datas.filter(x=>x.status == null && x.stdu=='TIDAK AKTIF').length;
            console.log(res);
        })
    });
})(window.angular);