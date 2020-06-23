(function(angular){
    'use strict'
    angular.module('EvaluasiPembelajaran', ['EvaluasiPembelajaranDirectives', 'TahunAkademikDirectives'])
    .controller('EvaluasiPembelajaranController', function($scope, $http, $window, TahunAkademikService, EvaluasiPembelajaranService, SweetAlert){
        $scope.DatasPenilaian = [];
            $scope.Pertanyaan = [];
            $scope.DatasMatakuliah = [];
            $scope.input = {};
            $scope.status = "Simpan";
            $scope.SelectedMatakuliah = {};
            $scope.Periode = {};
            $scope.ShowPertanyaan = false;
            $scope.Tombol=true;
            var token = $window.sessionStorage.getItem("Token");
            $scope.ThAktif = {};
            $http({
                method: "get",
                url: "https://restsimak.stimiksepnop.ac.id/api/Users/GetBiodata",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": token

                }
            }).then(function (response) {
                $scope.input.npm = response.data.data[0].npm;
            })
            TahunAkademikService.get().then(response => {
                $scope.ThAktif = response;
            }, error => {
                console.log(error);
            })

            EvaluasiPembelajaranService.getPertanyaan().then(response => {
                $scope.Pertanyaan = response;
            }, error => {
                console.log(error);
            })

            EvaluasiPembelajaranService.get().then(response => {
                $scope.DatasMatakuliah = response;
            }, error => {
                console.log(error);
            })

            EvaluasiPembelajaranService.getPeriode().then(response => {
                $scope.Periode = response;
            }, error => {
                console.log(error);
            })

            $scope.TampilPertanyaan = function () {
                $scope.ShowPertanyaan = true;
                $scope.SelectedMatakuliah = JSON.parse(angular.copy($scope.SelectedMatakuliah));
            }

            $scope.Simpan = function () {
                if ($scope.status == "Simpan") {
                    $scope.input.thakademik = $scope.ThAktif.thakademik;
                    $scope.input.gg= $scope.ThAktif.gg;
                    $scope.input.period = $scope.Periode[0].nm_period;
                    $scope.input.kmk = $scope.SelectedMatakuliah.kmk;
                    $scope.input.kdps = $scope.SelectedMatakuliah.kdps;
                    $scope.input.nidn = $scope.SelectedMatakuliah.nidn;
                    $scope.input.kelas = $scope.SelectedMatakuliah.kelas;
                   
                    $scope.input.Pertanyaan = $scope.Pertanyaan;
                    SweetAlert.swal({
                        title: "Information?",
                        text: "Anda yakin akan menyimpan Penilaian Evaluasi?",
                        type: "info",
                        showCancelButton: true,
                        confirmButtonColor: "#DD6B55",
                        confirmButtonText: "Yes",
                        cancelButtonText: "No",
                        closeOnConfirm: true,
                        closeOnCancel: true
                    },
                        function (isConfirm) {
                            if (isConfirm) {
                                $scope.Tombol = false;
                                EvaluasiPembelajaranService.post($scope.input).then(response => {
                                    SweetAlert.swal("Information!", "Berhasil", "success");
                                    $scope.Tombol = true;
                                    $scope.ShowPertanyaan = false;
                                    $scope.input ={};
                                }, error => {
                                    SweetAlert.swal("Cancelled", "Proses Gagal :)", "error");
                                    $scope.Tombol = true;
                                })
                            } else {
                                SweetAlert.swal("Cancelled", "Proses Dibatalkan :)", "error");
                                $scope.Tombol = true;
                            }
                        });
                    

                }
                // $scope.GetSimpan = function (item) {
                //     $scope.input = {};
                //     $scope.status = "Simpan";
                // }
                // $scope.GetData = function (item) {
                //     $scope.input = item;
                //     $scope.status = "Update";
                // }


            }
    });
})(window.angular);