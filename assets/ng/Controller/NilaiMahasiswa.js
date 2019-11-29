(function(angular){
    'use strict'
    angular.module('NilaiMahasiswa', ['KhsmDirectives', 'GradeNilaiDirectives'])
    .controller('NilaiMahasiswaController', function($scope, KhsmService, GradeNilaiService){
        $scope.DatasMatakuliah = [];
        $scope.SelectedMatakuliah="";
        $scope.GradeNilai = [];
        $scope.Nilai = 0;

        GradeNilaiService.get().then(response => {
            $scope.GradeNilai = response;
        }, error => {
            console.log(error.data);
        })
        KhsmService.get().then(response =>{
            $scope.DatasMatakuliah = response;
        }, error => {
            console.log();
        })
        $scope.GetMahasiswa = function(){
            var a = JSON.parse($scope.SelectedMatakuliah);
            $scope.SelectedMatakuliah = a;
        }
        $scope.Hitung = function(item){
            item.nilai = parseInt(item.nilai);
            angular.forEach($scope.GradeNilai, function(value, key){
                if(item.nilai >= parseInt(value.range_awal) && item.nilai <= parseInt(value.range_akhir)){
                    item.nxsks = parseInt(item.sks) * parseInt(value.bobot);
                    item.nhuruf = value.nilai;
                    item.ket = value.kets;
                }
            })
        }
        $scope.Proses = function(){
            KhsmService.put($scope.SelectedMatakuliah).then(response =>{
                alert("Berhasil");
            }, error =>{
                console.log(error.data);
            })
        }
    });
})(window.angular);