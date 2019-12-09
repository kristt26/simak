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
        }, error => {
            console.log(error.data);
        })
        KhsmServicee.get().then(response =>{
            $scope.DatasMatakuliah = response;
        }, error => {
            console.log();
        })
        $scope.GetMahasiswa = function(){
            var a = JSON.parse($scope.SelectedMatakuliah);
            $scope.SelectedMatakuliah = a;
            $scope.Show = true;
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
    });
})(window.angular);