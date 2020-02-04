(function (angular) {
    'use strict'
    angular.module('PengajuanKRS', ['PengajuanKRSDirective', 'JadwalDirectives', 'MahasiswaDirectives'])

        .filter('total', function () {
            return function (input, property) {
                if (input.length != undefined) {
                    var i = input.length;
                    var total = 0;
                    while (i--)
                        total += parseInt(input[i][property]);
                    return total;
                }
            }
        })

        .controller('PengajuanKRSController', function ($scope, PengajuanService, $window, Jadwal, $filter, $state, SweetAlert, MahasiswaService, $sce) {

            // setTimeout(x => {
            $scope.GetValue;
            $scope.jmsms;
            $scope.showJadwal = false;
            $scope.showJadwal1 = false;
            $scope.TemKrsmJadwal = false;
            $scope.KrsmJadwal = false;
            $scope.showKrsm = false;
            $scope.DatasJadwal = [];
            $scope.DatasKrsm = [];
            $scope.CariJadwal = "";
            $scope.Kelas = "";
            $scope.Tombol = true;
            $scope.BatasReg = false;
            $scope.DatasKrsm.DetailKrsm = [];


            PengajuanService.get().then(response => {
                $scope.jmsks = 0;

                if (response.set == 'Jadwal') {
                    $scope.showJadwal = true;
                    $scope.showKrsm = false;
                    $scope.TemKrsmJadwal = false;
                    $scope.KrsmJadwal = false;
                    $scope.showJadwal1 = true;
                    $scope.BatasReg = false;
                    $scope.DatasJadwal = response.data.data;
                    $scope.GetValue = angular.copy($scope.DatasJadwal[0]);
                } else if (response.set == 'TemKrsm') {

                    $scope.showJadwal = false;
                    $scope.showKrsm = false;
                    $scope.TemKrsmJadwal = true;
                    $scope.KrsmJadwal = false;
                    $scope.showJadwal1 = false;
                    $scope.BatasReg = false;
                    $scope.DatasTemKrsm = response.data.data;
                    SweetAlert.swal(
                        {
                            title: 'Information!',
                            type: 'info',
                            text: 'Pengajuan KRS anda sudah di <strong>' + $scope.DatasTemKrsm.TemKrsm[0].status + '</strong>',
                            html:true
                        });
                    Jadwal.get().then(response => {

                        var a = JSON.parse(response.data);
                        $scope.GetValue = angular.copy($scope.DatasJadwal[0]);
                        $scope.DatasJadwal = a;

                        MahasiswaService.get($scope.DatasTemKrsm.TemKrsm[0].npm).then(response => {
                            $scope.DatasJadwal = $filter('filter')(a, function (value) {
                                return (value.kurikulum === response.data[0].kurikulum || value.kurikulum === 'ALL') && value.kdps === response.data[0].kdps;
                            });
                            $scope.GetValue = angular.copy($scope.DatasJadwal[0]);
                            angular.forEach($scope.DatasTemKrsm.TemDetailKrsm, function (value, key) {
                                $scope.jmsks += parseInt(value.sks);
                                angular.forEach($scope.DatasJadwal, function (value1, key1) {
                                    if (value.kmk == value1.kmk && value.kelas == value1.kelas) {
                                        value1.status = true;
                                        value1.ngBinding = "success";
                                        value.hari = value1.hari;
                                        value.ws = value1.ws;
                                        value.wm = value1.wm;
                                    }
                                });
                            });
                        })

                    }, error => {
                        console.log(error);
                        // 
                    });

                } else if (response.set == 'Krsm') {
                    $scope.DatasKrsm = response.data.data;
                    angular.forEach($scope.DatasKrsm.DetailKrsm, function (value, key) {
                        $scope.jmsks += parseInt(value.sks);
                    });
                    $scope.GetValue = angular.copy($scope.DatasJadwal[0]);
                    $scope.showJadwal = false;
                    $scope.showKrsm = true;
                    $scope.TemKrsmJadwal = false;
                    $scope.KrsmJadwal = false;
                    $scope.showJadwal1 = false;
                    $scope.BatasReg = false;
                    // SweetAlert.swal("KRS Anda telah selesai di proses");
                } else if (response.set == 'Daftar Ulang') {
                    $scope.showKrsm = false;
                    $scope.showJadwal = false;
                    $scope.TemKrsmJadwal = false;
                    $scope.showJadwal1 = false;
                    $scope.KrsmJadwal = false;
                    $scope.BatasReg = false;
                    SweetAlert.swal("Anda Belum Terdaftar Silahkan hubungi bagian Program Studi");
                } else if (response.set == 'BatasReg') {
                    $scope.showKrsm = false;
                    $scope.showJadwal = false;
                    $scope.showJadwal1 = false;
                    $scope.TemKrsmJadwal = false;
                    $scope.KrsmJadwal = false;
                    $scope.BatasReg = true;
                    SweetAlert.swal("Registrasi KRS Telah Tutup, Silahkan Hubungi Program Studi");
                } else if (response.set == 'MulaiReg') {
                    $scope.showKrsm = false;
                    $scope.showJadwal = false;
                    $scope.showJadwal1 = false;
                    $scope.TemKrsmJadwal = false;
                    $scope.KrsmJadwal = false;
                    $scope.BatasReg = true;
                    SweetAlert.swal("Registrasi KRS Belum di Buka");
                } else {
                    $scope.showKrsm = false;
                    $scope.showJadwal = false;
                    $scope.showJadwal1 = false;
                    $scope.TemKrsmJadwal = false;
                    $scope.KrsmJadwal = false;
                    SweetAlert.swal("Data Jadwal Belum Tersedia Segera Hubungi Bagian BAAK Untuk ketersediaan");
                }
            }, error => {
                console.log(error);
                if (error.data.message == "Sessiom Habis") {
                    SweetAlert.swal("Session Anda Habis Silahkan Login kembali");
                    window.location.href = "index.html";
                } else if (error.data.message == "Data Jadwal Belum Tersedia Segera Hubungi Bagian BAAK Untuk ketersediaan") {
                    SweetAlert.swal("Data Jadwal Belum Tersedia Segera Hubungi Bagian BAAK Untuk ketersediaan");
                }
            });

            $scope.PilihItem = function (item) {
                if (item.ngBinding == "success") {
                    alert("\nMatakuliah tersebut sudah dipilih");
                } else {
                    if ($scope.jmsks + parseInt(item.sks) <= 24) {
                        SweetAlert.swal({
                            title: "Confirmation!!!",
                            text: "Anda Yakin ingin Menambah Matakuliah?",
                            type: "info",
                            showCancelButton: true,
                            confirmButtonColor: "#0be7fb",
                            confirmButtonText: "Yes, Ubah!",
                            cancelButtonText: "No, Batal!",
                            closeOnConfirm: true,
                            closeOnCancel: true

                        },
                            function (isConfirm) {
                                if (isConfirm) {
                                    $scope.DataKrs = {
                                        'thakademik': $scope.GetValue.thakademik,
                                        'gg': $scope.GetValue.gg,
                                        'npm': $window.sessionStorage.getItem("Username"),
                                        'sms': '',
                                        'dsn_wali': '',
                                        'ketjur': '',
                                        'admakademik': '',
                                        'jmsks': $scope.jmsks,
                                        'tgkrsm': '',
                                        'kdps': $scope.GetValue.kdps
                                    };
                                    var data = {};
                                    data.krsm = $scope.DataKrs;
                                    data.DetailKrsm = item;
                                    PengajuanService.post(data).then(response => {
                                        alert(response.message);
                                        $scope.jmsks += parseInt(angular.copy(item.sks));
                                        item.status = false;
                                        item.ngBinding = "success";
                                        $scope.DatasTemKrsm.TemDetailKrsm.push(item);
                                    }, error => {
                                        //console.log(error);
                                        $state.reload();
                                    });
                                } else {
                                    SweetAlert.swal("Cancelled", "Perubahan Password di batalkan:)", "error");
                                }
                            }
                        );

                    } else
                        alert("\nTotal SKS yang ada pilih melebihi Batas");

                }
            }

            $scope.DataTampung = [];
            $scope.Pilih = function (item) {
                if (item.ngBinding == "success") {
                    alert("\nMatakuliah tersebut sudah dipilih");
                } else {
                    if ($scope.jmsks + parseInt(item.sks) <= 24) {
                        $scope.jmsks += parseInt(angular.copy(item.sks));
                        item.status = false;
                        item.ngBinding = "success";
                        $scope.DataTampung.push(item);
                        $scope.Tombol = false;
                    } else
                        SweetAlert.swal("Info", "Total SKS yang ada pilih melebihi Batas)", "error");
                }
            }

            $scope.HapusPilihan = function (item) {

                $scope.jmsks -= parseInt(angular.copy(item.sks));
                var index = $scope.DataTampung.findIndex(DataTampung => DataTampung.idjadwal == item.idjadwal);
                $scope.DataTampung.splice(index, 1);
                angular.forEach($scope.DatasJadwal, function (value, key) {
                    if (value.idjadwal == item.idjadwal) {
                        value.ngBinding = "";
                    }
                });
            }

            $scope.Hapus = function (item) {
                SweetAlert.swal({
                    title: "Confirmation!!!",
                    text: "Anda Yakin ingin Menghapus Matakuliah?",
                    type: "info",
                    showCancelButton: true,
                    confirmButtonColor: "red",
                    confirmButtonText: "Hapus!",
                    cancelButtonText: "Batal!",
                    closeOnConfirm: true,
                    closeOnCancel: true,
                    showLoaderOnConfirm: true
                },
                    function (isConfirm) {
                        if (isConfirm) {
                            $scope.DataKrs = {
                                'thakademik': $scope.GetValue.thakademik,
                                'gg': $scope.GetValue.gg,
                                'npm': $window.sessionStorage.getItem("Username"),
                                'sms': '',
                                'dsn_wali': '',
                                'ketjur': '',
                                'admakademik': '',
                                'jmsks': $scope.jmsks,
                                'tgkrsm': '',
                                'kdps': $scope.GetValue.kdps
                            };
                            var data = {};
                            data.krsm = $scope.DataKrs;
                            data.DetailKrsm = item;
                            PengajuanService.delete(item).then(response => {
                                var kmk = angular.copy(item.kmk);
                                $scope.jmsks -= parseInt(angular.copy(item.sks));
                                $scope.Data = $scope.DatasTemKrsm.TemDetailKrsm
                                var index = $scope.Data.findIndex(Data => Data.kmk == item.kmk);
                                $scope.DatasTemKrsm.TemDetailKrsm.splice(index, 1);
                                angular.forEach($scope.DatasJadwal, function (value, key) {
                                    if (value.kmk == item.kmk) {
                                        value.ngBinding = "";
                                    }
                                });
                            }, error => {
                                console.log(error);
                                alert(response.message);
                            });
                        } else {
                            SweetAlert.swal("Cancelled", "Perubahan Password di batalkan:)", "error");
                        }
                    }
                );


            }
            $scope.AjukanKRS = function () {
                if ($scope.DataTampung.length > 0) {
                    SweetAlert.swal({
                        title: "Anda Yakin?",
                        text: "Anda akan melakukan pengajuan KRSM",
                        type: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#DD6B55",
                        confirmButtonText: "Yes, Ajukkan!",
                        cancelButtonText: "No, cancel!",
                        closeOnConfirm: true,
                        closeOnCancel: true
                    },
                        function (isConfirm) {
                            if (isConfirm) {
                                $scope.Tombol = true;
                                $scope.DataKrs = {
                                    'thakademik': $scope.GetValue.thakademik,
                                    'gg': $scope.GetValue.gg,
                                    'npm': $window.sessionStorage.getItem("Username"),
                                    'sms': '',
                                    'dsn_wali': '',
                                    'ketjur': '',
                                    'admakademik': '',
                                    'jmsks': $scope.jmsks,
                                    'tgkrsm': '',
                                    'kdps': $scope.GetValue.kdps
                                };
                                var data = {};
                                data.krsm = $scope.DataKrs;
                                data.DetailKrsm = $scope.DataTampung;
                                PengajuanService.post(data).then(response => {
                                    SweetAlert.swal("Pengajuan!", response.message, "success");
                                    $scope.Tombol = false;
                                }, error => {
                                    SweetAlert.swal(response.message);
                                });

                            } else {
                                SweetAlert.swal("Cancelled", "Your proses krsm has been cancelled:)", "error");
                                $scope.Tombol = false;
                            }
                        });
                } else {
                    SweetAlert.swal("Woi!!!!!! \n Pilih Matakuliah dulu");
                }
            }
        });
})(window.angular);