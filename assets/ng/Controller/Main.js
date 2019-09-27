(function (angular) {
    'use strict'
    angular.module('Main', ['HomeDirectives', 'JadwalDirectives', 'KemajuanStudiDirective'])
        .controller("MainController", function ($scope, HomeService, Jadwal, KhsmService, $window, SweetAlert) {
            $scope.DatasHome = {};
            $scope.DatasJadwal = [];
            $scope.DatasPenelitian=[];
            $scope.Khsm = {};
            $scope.Input = {};
            $scope.TahunAkademik = {};
            $scope.Testing;
            $scope.RoleMahasiswa = false;
            $scope.RolePegawai = false;
            $scope.DatasJadwal = [];
            $scope.DataLooping = [{ semester: '1' }, { semester: '2' }, { semester: '3' }, { semester: '4' }, { semester: '5' }, { semester: '6' }, { semester: '7' }, { semester: '8' }];
            $scope.Input.npm = $window.sessionStorage.getItem("Username");
            HomeService.get().then(response => {
                if (response.Role == "Mahasiswa") {
                    HomeService.getTA().then(response => {
                        $scope.TahunAkademik = response;
                    })
                    HomeService.getPenelitian().then(response => {
                        $scope.DatasPenelitian= response;
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
                            var a = JSON.parse(value);
                            $scope.Khsm.Datas.push(angular.copy(a));
                            $scope.Khsm.IPK = b.IPK;
                            $scope.Khsm.SKS = b.SKS;
                        });
                        if ($scope.Khsm.IPK == 0)
                            SweetAlert.swal("Kemajuan Studi Anda Masih Kosong, Segera melapor ke BAAK!!!!");
                    }, error => {
                        var a = error;
                    });
                }else{
                    HomeService.getTA().then(response => {
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