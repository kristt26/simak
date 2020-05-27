(function (angular) {
    'use strict'
    angular.module('BeritaAcara', ['BeritaAcaraDirective', 'JadwalDirectives', 'MatakuliahDirective'])
        .controller('BeritaAcaraController', function ($scope, BaService, $compile, DTOptionsBuilder, DTColumnBuilder, $state, DTColumnDefBuilder, $window, SweetAlert, Jadwal, MatakuliahService, AuthRole) {
            // $scope.select2Options = {
            //     allowClear:true
            // };
            $scope.ClearItem = AuthRole.Role;
            $scope.DatasBa = [];
            $scope.DatasLaporan = [];
            $scope.DatasPersetujuan = [];
            $scope.Cari = "";
            $scope.Hide = true;
            $scope.DatasJadwal = [];
            $scope.DatasMatakuliah = [];
            $scope.DataPrint = [];
            $scope.SelectedMatakuliah = "";
            $scope.DataDosen = "";
            $scope.Input = {};
            $scope.Input.hadir = 0;
            $scope.Input.jumlah = 0;
            $scope.Input.alpha = 0;
            $scope.Input.sakit = 0;
            $scope.Input.izin = 0;
            $scope.ShowDetailDosen = false;
            $scope.TanggalInput;
            $scope.TanggalLaporan = new Date();
            BaService.getlaporan().then(response => {
                $scope.DatasBa = response.data;
                angular.forEach($scope.DatasBa, function (value, key) {
                    if (value.beritaacara.length > 0) {
                        $scope.DataPrint.push(angular.copy(value));
                    }
                })
                BaService.laporan().then(laporan=>{
                    $scope.DatasLaporan=laporan
                })
            });

            MatakuliahService.getMatakuliah().then(response => {
                $scope.DatasMatakuliah = response;
            }, error => {
                console.log(error);
            })
            Jadwal.get().then(response => {
                $scope.DatasJadwal = JSON.parse(response.data);
            }, error => {
                console.log(error);
            })
            BaService.getPersetujuan().then(response => {
                $scope.DatasPersetujuan = response;
            }, error => {
                console.log(error);
            });
            var vm = this;
            vm.dtOptions = DTOptionsBuilder.fromSource($scope.DatasBa)
                .withDOM('frtip')
                .withOption('paging', true)
                .withOption('searching', false)
                .withOption('info', false)
                .withPaginationType('full_numbers');
            vm.dtColumns = [
                DTColumnBuilder.newColumn('id').withTitle('ID'),
                DTColumnBuilder.newColumn('firstName').withTitle('First name'),
                DTColumnBuilder.newColumn('lastName').withTitle('Last name')
            ];
            $scope.Setujui = function (item) {
                SweetAlert.swal({
                    title: "Anda Yakin?",
                    text: "Anda akan Menyetujui Berita Acara?",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#0be7fb",
                    confirmButtonText: "Yes, Approved!",
                    cancelButtonText: "No, Batal!",
                    closeOnConfirm: false,
                    closeOnCancel: false,
                    showLoaderOnConfirm: true
                },
                    function (isConfirm) {
                        if (isConfirm) {
                            item.persetujuan1 = $window.sessionStorage.getItem("NamaUser");
                            BaService.putPersetujuan(item).then(response => {
                                SweetAlert.swal("Approved!", "Your proses Update Berita Acara has been approved.", "success");
                            }, error => {
                                SweetAlert.swal("Cancelled", "Proses Gagal :)", "error");
                                item.persetujuan1 = null;
                            });
                        } else {
                            SweetAlert.swal("Cancelled", "Proses Dibatalkan :)", "error");
                            $scope.Tombol = false;
                        }
                    });
            }
            $scope.GetDataDosen = function () {
                var a = JSON.parse($scope.SelectedMatakuliah);
                $scope.DataDosen = a.nmdsn;
                $scope.Input.nidn = a.nidn;
                $scope.Input.idjadwal = a.idjadwal;
                $scope.Input.kmk = a.kmk;
                $scope.ShowDetailDosen = true;
            }
            $scope.Simpan = function () {
                var Tanggal = angular.copy($scope.TanggalInput);
                var day = Tanggal.getDate();
                var monthIndex = Tanggal.getMonth();
                var year = Tanggal.getFullYear();
                $scope.Input.tanggal = year + "-" + (monthIndex + 1) + "-" + day;
                SweetAlert.swal({
                    title: "Anda Yakin?",
                    text: "Tambah Berita acara",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "Yes, Approved!",
                    cancelButtonText: "No, cancel!",
                    closeOnConfirm: false,
                    closeOnCancel: true,
                    showLoaderOnConfirm: true
                },
                    function (isConfirm) {
                        if (isConfirm) {
                            BaService.addBA($scope.Input).then(response => {
                                var a = JSON.parse($scope.SelectedMatakuliah);
                                $scope.Input.idbamengajardosen = response;
                                $scope.Input.persetujuan1 = null;
                                $scope.Input.persetujuan2 = null;
                                $scope.Input.status = "non";
                                $scope.Input.nmmk = a.nmmk;
                                $scope.Input.sks = a.sks;
                                $scope.Input.smt = a.smt;
                                $scope.Input.kdps = a.kdps;
                                $scope.Input.kelas = a.kelas;
                                $scope.Input.dsn_saji = a.dsn_saji;
                                $scope.Input.nmmk = a.nmmk;
                                $scope.DatasPersetujuan.push(angular.copy($scope.Input));
                                SweetAlert.swal("Information!", "Berhasil Simpan", "success");
                                $scope.SelectedMatakuliah = "";
                                $scope.Input={};

                            }, error => {
                                SweetAlert.swal("Information!", "Data Gagal Simpan", "error");
                                // $state.reload();
                            })
                        } else {
                            SweetAlert.swal("Cancelled", "Proses Dibatalkan :)", "error");
                        }
                    });

            }
            $scope.JumlahHadir = function () {
                $scope.Input.hadir = parseInt($scope.Input.jumlah) - parseInt($scope.Input.alpha) - parseInt($scope.Input.sakit) - parseInt($scope.Input.izin);
            }
            $scope.Hapus = function (item) {
                SweetAlert.swal({
                    title: "Anda Yakin?",
                    text: "Anda akan Menghapus Berita Acara?",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "Yes, Approved!",
                    cancelButtonText: "No, cancel!",
                    closeOnConfirm: true,
                    closeOnCancel: true
                },
                    function (isConfirm) {
                        if (isConfirm) {
                            BaService.deleteBa(item).then(response => {
                                SweetAlert.swal("Approved!", "Berhasil", "success");
                                var index = $scope.DatasPersetujuan.indexOf(item);
                                $scope.DatasPersetujuan.splice(index, 1);
                            }, error => {
                                SweetAlert.swal("Cancelled", "Proses Gagal :)", "error");
                                item.persetujuan1 = null;
                            });
                        } else {
                            SweetAlert.swal("Cancelled", "Proses Dibatalkan :)", "error");
                            $scope.Tombol = false;
                        }
                    });
            }
            $scope.PrintBA = function (DaftarBa) {
                var innerContents = document.getElementById(DaftarBa).innerHTML;
                var popupWinindow = window.open('', '_blank', 'width=600,height=700,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
                popupWinindow.document.open();
                popupWinindow.document.write('<html><head><link href="assets/bower_components/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet"><link href="assets/dist/css/AdminLTE.min.css" rel="stylesheet"><link href="assets/dist/css/skins/_all-skins.min.css" rel="stylesheet"></head><body onload="window.print()"><div>' + innerContents + '</html>');
                popupWinindow.document.close();
            }

            $scope.Printlaporan = function (LaporanBa) {
                var innerContents = document.getElementById(LaporanBa).innerHTML;
                var popupWinindow = window.open('', '_blank', 'width=600,height=700,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
                popupWinindow.document.open();
                popupWinindow.document.write('<html><head><link href="assets/bower_components/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet"><link href="assets/dist/css/AdminLTE.min.css" rel="stylesheet"><link href="assets/dist/css/skins/_all-skins.min.css" rel="stylesheet"></head><body onload="window.print()"><div>' + innerContents + '</html>');
                popupWinindow.document.close();
            }

            $scope.toExcell = function (item) {
                var htmltable = document.getElementById(item);
                var html = htmltable.outerHTML;
                window.open('data:application/vnd.ms-excel,' + encodeURIComponent(html));
            }
            $scope.Rekap = function (DaftarBa) {
                SweetAlert.swal({
                    title: "Anda Yakin?",
                    text: "Anda akan melakukan rekap Berita Acara, Proses rekap tidak dapat diulang",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "Yes, Approved!",
                    cancelButtonText: "No, cancel!",
                    closeOnConfirm: true,
                    closeOnCancel: true
                },
                    function (isConfirm) {
                        if (isConfirm) {
                            BaService.putRekap().then(response => {
                                SweetAlert.swal("Approved!", "Your proses Update Berita Acara has been approved.", "success");

                            }, error => {
                                SweetAlert.swal("Cancelled", "Proses Gagal :)", "error");
                                item.persetujuan1 = null;
                            });
                        } else {
                            SweetAlert.swal("Cancelled", "Proses Dibatalkan :)", "error");
                            $scope.Tombol = false;
                        }
                    });
            }
        });
})(window.angular);