(function (angular) {
    'use strict'
    angular.module('BaseProfile', ['BaseProfileDirectives', 'JadwalDirectives', 'KemajuanStudiDirective', 'MahasiswaWaliDirective'])
        .controller("BaseProfileController", function ($scope, BaseProfileService, Jadwal, KhsmService, $window, SweetAlert, WaliMahasiswa) {
            $scope.DatasHome = {};
            $scope.DatasJadwal = [];
            $scope.Khsm = {};
            $scope.Input = {};
            $scope.TahunAkademik = {};
            $scope.Testing;
            $scope.RoleMahasiswa = false;
            $scope.RolePegawai = false;
            $scope.DatasJadwal = [];
            $scope.ListMonitoring = [];
            $scope.DataLooping = [{ semester: '1' }, { semester: '2' }, { semester: '3' }, { semester: '4' }, { semester: '5' }, { semester: '6' }, { semester: '7' }, { semester: '8' }];
            $scope.Input.npm = $window.sessionStorage.getItem("Username");
            BaseProfileService.get().then(response => {
                if (response.Role == "Mahasiswa") {
                    BaseProfileService.getTA().then(response => {
                        $scope.TahunAkademik = response;
                    })
                    $scope.RoleMahasiswa = true;
                    $scope.DatasHome = angular.copy(response);
                    Jadwal.getJadwalKuliah($scope.DatasHome).then(response => {
                        $scope.DatasJadwal = response;
                    }, error => {
                    });
                    KhsmService.get($scope.Input).then(response => {
                        $scope.Khsm.Datas = [];
                        var b = response.data;
                        angular.forEach(b.Datas, function (value, key) {
                            $scope.Khsm.Datas.push(angular.copy(value));
                            $scope.Khsm.IPK = b.IPK;
                            $scope.Khsm.SKS = b.SKS;
                        });
                        if ($scope.Khsm.IPK == 0)
                            SweetAlert.swal("Kemajuan Studi Anda Masih Kosong, Segera melapor ke BAAK!!!!");
                    }, error => {
                        var a = error;
                    });
                    $scope.peringatan="";
                    WaliMahasiswa.getList().then(response =>{
                        $scope.ListMonitoring = response;
                        if(parseInt($scope.ListMonitoring.data[0].SMT_Tempuh)<=4 || (parseInt($scope.ListMonitoring.data[0].SKS_Lulus)<30 && parseInt($scope.ListMonitoring.data[0].IPK<1))){
                            $scope.peringatan = $scope.ListMonitoring.pesan + " 1";
                        }else if(parseInt($scope.ListMonitoring.data[0].SMT_Tempuh)<=6 && parseInt($scope.ListMonitoring.data[0].SKS_Lulus)<50){
                            $scope.peringatan = $scope.ListMonitoring.pesan + " 2";
                        }else if(parseInt($scope.ListMonitoring.data[0].SMT_Tempuh)<=8 || (parseInt($scope.ListMonitoring.data[0].SKS_Lulus)<700 && parseInt($scope.ListMonitoring.data[0].IPK<2))){
                            $scope.peringatan = $scope.ListMonitoring.pesan + " 3";
                        }else if(parseInt($scope.ListMonitoring.data[0].SMT_Tempuh)<=10 && parseInt($scope.ListMonitoring.data[0].SKS_Lulus)<90){
                            $scope.peringatan = $scope.ListMonitoring.pesan + " TERAKHIR";
                        }else if(parseInt($scope.ListMonitoring.data[0].SMT_Tempuh)<=12 && parseInt($scope.ListMonitoring.data[0].SKS_Lulus)<100){
                            $scope.peringatan = $scope.ListMonitoring.pesan + " TERAKHIR";
                        }
                       
                    });

                }else{
                    BaseProfileService.getTA().then(response => {
                        $scope.TahunAkademik = response;
                        Jadwal.getJadwalDosen().then(response => {
                            $scope.DatasJadwal =  response;
                        })
                    })
                    $scope.DatasHome = angular.copy(response);
                    $scope.RolePegawai = true;
                }
            });
            
        });
})(window.angular);