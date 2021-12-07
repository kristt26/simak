(function (angular) {
    'use strict'
    angular.module('NilaiMahasiswa', ['KhsmDirectives', 'GradeNilaiDirectives', 'MahasiswaDirectives'])
        .controller('NilaiMahasiswaController', function ($scope, KhsmServicee, GradeNilaiService, SweetAlert) {
            $scope.DatasMatakuliah = [];
            $scope.SelectedMatakuliah = "";
            $scope.GradeNilai = [];
            $scope.Nilai = 0;
            $scope.Show = false;
            $scope.Tombol = true;

            GradeNilaiService.get().then(response => {
                $scope.GradeNilai = response;
                KhsmServicee.get().then(response => {
                    $scope.DatasMatakuliah = response;
                }, error => {
                    console.log();
                })
            }, error => {
                console.log(error.data);
            })
            $scope.GetMahasiswa = function () {
                var a = JSON.parse($scope.SelectedMatakuliah);
                $scope.SelectedMatakuliah = a;
                $scope.Tanggal = new Date();
                $scope.Show = true;
            }
            $scope.Hitung = function (item) {
                item.nilai = parseFloat(item.nilai);
                angular.forEach($scope.GradeNilai, function (value, key) {
                    if (item.nilai >= parseFloat(value.range_awal) && item.nilai <= parseFloat(value.range_akhir)) {
                        item.nxsks = parseFloat(item.sks) * parseFloat(value.bobot);
                        item.nhuruf = value.nilai;
                        item.ket = value.kets;
                    }
                })
            }
            $scope.Proses = function () {
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
                            $scope.Tombol = false;
                            KhsmServicee.put($scope.SelectedMatakuliah).then(response => {
                                SweetAlert.swal("Information!", "Berhasil", "success");
                                KhsmServicee.get().then(response => {
                                    $scope.DatasMatakuliah = response;
                                    $scope.SelectedMatakuliah = "";
                                    SweetAlert.swal(response.message);
                                    $scope.Show = true;
                                    $scope.Tombol = true;
                                })
                            }, error => {
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
            $scope.printForm = () => {
                // var OPTION = {mode:"popup", popHt: 500, popWd: 400,popX: 500,popY: 600, popClose: true, strict: undefined};
                $("#print1").printArea();
            }
        })
        .controller('NilaiAllMahasiswaController', function ($scope, KhsmServicee, GradeNilaiService, SweetAlert) {
            $scope.DatasMatakuliah = [];
            $scope.SelectedMatakuliah = "";
            $scope.GradeNilai = [];
            $scope.Nilai = 0;
            $scope.Show = false;
            $scope.Tombol = true;

            GradeNilaiService.get().then(response => {
                $scope.GradeNilai = response;
                KhsmServicee.getAll().then(response => {
                    $scope.DatasMatakuliah = response;
                }, error => {
                    console.log();
                })
            }, error => {
                console.log(error.data);
            })
            $scope.GetMahasiswa = function () {
                var a = JSON.parse($scope.SelectedMatakuliah);
                $scope.SelectedMatakuliah = a;
                $scope.Tanggal = new Date();
                $scope.Show = true;
            }
            $scope.Hitung = function (item) {
                item.nilai = parseFloat(item.nilai);
                angular.forEach($scope.GradeNilai, function (value, key) {
                    if (item.nilai >= parseFloat(value.range_awal) && item.nilai <= parseFloat(value.range_akhir)) {
                        item.nxsks = parseFloat(item.sks) * parseFloat(value.bobot);
                        item.nhuruf = value.nilai;
                        item.ket = value.kets;
                    }
                })
            }
            $scope.Proses = function () {
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
                            $scope.Tombol = false;
                            KhsmServicee.put($scope.SelectedMatakuliah).then(response => {
                                SweetAlert.swal("Information!", "Berhasil", "success");
                                KhsmServicee.get().then(response => {
                                    $scope.DatasMatakuliah = response;
                                    $scope.SelectedMatakuliah = "";
                                    SweetAlert.swal(response.message);
                                    $scope.Show = true;
                                    $scope.Tombol = true;
                                })
                            }, error => {
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
            
        })
        .controller('linkTranskipController', function ($scope, MahasiswaService, SweetAlert) {
            $scope.npm = '';
            $scope.tombol = false;
            $scope.result = false;
            $scope.link = '';
            $scope.changetombol = () => {
                if ($scope.npm.length >= 9) {
                    $scope.tombol = true;
                } else {
                    $scope.tombol = false;
                }
            }
            $scope.generate = () => {
                MahasiswaService.get($scope.npm).then(res => {
                    console.log(res.data[0]);
                    if (res.data.length > 0) {
                        $scope.link = "https://www.simak1011.stimiksepnop.ac.id/transkip.php?npm=" + $scope.npm;
                        $scope.result = true;
                    } else {
                        $scope.result = false;
                        SweetAlert.swal("Information!", "NPM Tidak Terdaftar", "error");
                    }
                })
            }
            $scope.copy = () => {
                var copyText = document.getElementById("linkResult");
                copyText.select();
                copyText.setSelectionRange(0, 99999)
                document.execCommand("copy");
                SweetAlert.swal("Information!", "Copied the text", "success");
            }
        });
})(window.angular);