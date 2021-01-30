(function(angular){
    'use strict'
    angular.module('NilaiMahasiswa', ['KhsmDirectives', 'GradeNilaiDirectives'])
    .controller('NilaiMahasiswaController', function($scope, KhsmServicee, GradeNilaiService, SweetAlert){
        $scope.DatasMatakuliah = [];
        $scope.SelectedMatakuliah="";
        $scope.GradeNilai = [];
        $scope.Nilai = 0;
        $scope.Show = false;
        $scope.Tombol = true;

        GradeNilaiService.get().then(response => {
            $scope.GradeNilai = response;
            KhsmServicee.get().then(response =>{
                $scope.DatasMatakuliah = response;
            }, error => {
                console.log();
            })
        }, error => {
            console.log(error.data);
        })
        $scope.GetMahasiswa = function(){
            var a = JSON.parse($scope.SelectedMatakuliah);
            $scope.SelectedMatakuliah = a;
            $scope.Tanggal = new Date();
            $scope.Show = true;
        }
        $scope.Hitung = function(item){
            item.nilai = parseFloat(item.nilai);
            angular.forEach($scope.GradeNilai, function(value, key){
                if(item.nilai >= parseFloat(value.range_awal) && item.nilai <= parseFloat(value.range_akhir)){
                    item.nxsks = parseFloat(item.sks) * parseFloat(value.bobot);
                    item.nhuruf = value.nilai;
                    item.ket = value.kets;
                }
            })
        }
        $scope.Proses = function(){
            SweetAlert.swal({
                title: "Confirmation!!!!",
                text: "Anda Yakin???",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#104daa",
                confirmButtonText: "Yes",
                cancelButtonColor: "#bb2717",
                cancelButtonText: "cancel!",
                closeOnConfirm: true,
                closeOnCancel: true
            },
                function (isConfirm) {
                    if (isConfirm) {
                        $scope.Tombol=false;
                        KhsmServicee.put($scope.SelectedMatakuliah).then(response =>{
                            SweetAlert.swal("Information!", "Berhasil", "success");
                            $scope.Tombol=true;
                            $scope.Show = false;
                            $scope.SelectedMatakuliah = {};
                        }, error =>{
                            SweetAlert.swal(response.message);
                            $scope.Show = true;
                            $scope.Tombol=true;
                        })
                    } else {
                        SweetAlert.swal("Cancelled", "Anda Membatalkan Proses:)", "error");
                        $scope.Tombol = true;
                    }
                });
            
        }
        $scope.print = () => {
            // var OPTION = {mode:"popup", popHt: 500, popWd: 400,popX: 500,popY: 600, popClose: true, strict: undefined};
            $("#print").printArea();
        }
    });
})(window.angular);