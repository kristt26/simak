(function (angular) {
    'use strict'
    angular.module('TagihanPembayaran', ['TagihanDirectives'])
        .controller('TagihanController', function ($scope, tagihankeuangan, $http, $window, fileUpload, fileDelete, $sce, SweetAlert, AuthService, fileToBase64) {
            $scope.DataTotal = {};
            $scope.DataPembayaran = {};
            $scope.pembayaranMahasiswa = [];
            $scope.File;
            $scope.TA;
            tagihankeuangan.get().then(tagihan => {
                $scope.DataPembayaran = tagihan;
                $scope.DataInformation = [];
                $scope.DataPrint = [];
                $scope.DataTotal.Total = 0;
                $scope.DataTotal.Bayar = 0;
                $scope.DataTotal.Tunggakan = 0;

                var a = false;
                $scope.DataInformation = angular.copy(tagihan.Mahasiswa);
                angular.forEach($scope.DataInformation.MasterBayar, function (value1, key1) {
                    $scope.DataBayarKhusus = 0;
                    angular.forEach(value1.BayarKhusus, function (value2) {
                        $scope.DataBayarKhusus += parseInt(angular.copy(value2.Nominal));
                    })
                    value1.TrxBayar.forEach(itembayar => {
                        if(itembayar.Berkas){
                            var a = "https://keuangan.stimiksepnop.ac.id/assets/berkas/" + angular.copy(itembayar.Berkas);
                            fileToBase64.convert(a, function (base64Img) {
                                itembayar.File = base64Img;
                            })
                            itembayar.file = $sce.trustAsResourceUrl(a);
                        }
                        $scope.pembayaranMahasiswa.push(itembayar);
                    })
                    $scope.DataTotal.Total += parseInt(value1.Total);
                    $scope.DataTotal.Bayar += parseInt(value1.Bayar);
                    $scope.DataTotal.Tunggakan += parseInt(value1.Tunggakan);
                    value1.Total = parseInt(value1.Total);
                })
            })
            $scope.ShowDataPembayaran = function (item) {
                $scope.DetailBayar = angular.copy(item);
                $scope.DetailBayar.Total = 0;
                angular.forEach($scope.DetailBayar.TrxBayar, function (value, key) {
                    $scope.DetailBayar.Total += parseInt(angular.copy(value.JumlahBayar));
                })
            }
            $scope.ShowDataTagihan = function (item) {
                $scope.PrintBayar = item.Bayar;
                $scope.PrintTotal = item.Total;
                $scope.PrintTunggakan = item.Tunggakan;
                $scope.DataPrint = [];
                $scope.TotalBayar = {};
                var TA = item.TA.split('-');
                $scope.thakademik = TA[0];
                $scope.gg = "";
                if (TA[1] == "1") {
                    $scope.gg = "GANJIL";
                } else {
                    $scope.gg = "GENAP";
                }

                var Url = "https://restsimak.stimiksepnop.ac.id/api/sksMahasiswa/AmbilSks?npm=" + $window.sessionStorage.getItem("Username") + "&thakademik=" + $scope.thakademik + "&gg=" + $scope.gg;
                $http({
                    method: "GET",
                    url: Url,
                }).then(function (response) {
                    if (response.data.data.SKS != 0) {
                        $scope.Praktikum = 0;
                        $scope.sks = 0;
                        if (response.data.data.SKS <= 12) {
                            $scope.sks = 0;
                        } else {
                            $scope.sks = parseInt(response.data.data.SKS) - 12;
                        }
                        $scope.Praktikum = parseInt(response.data.data.Praktikum);
                        $scope.DatasTagihan = angular.copy(item);
                        $scope.TotalBayar.BayarKhusus = 0;
                        $scope.TotalBayar.IndexBayarKhusus;
                        $scope.TotalBayar.BayarUmum = 0;
                        $scope.TotalBayar.IndexBayarUmum;
                        $scope.total = 0;
                        angular.forEach($scope.DatasTagihan.BayarKhusus, function (value, key) {
                            angular.forEach($scope.DataPembayaran.BayarKhusus, function (value1, key1) {
                                if (value.IdBayarKhusus == value1.IdBayarKhusus) {
                                    angular.forEach($scope.DataPembayaran.JenisBayar, function (value2, key2) {
                                        if (value1.IdJenisBayar == value2.IdJenisBayar) {
                                            value.Jenis = value2.Jenis;
                                            $scope.DataPrint.push(angular.copy(value));
                                        } else {
                                            // $scope.DataPrint.push(angular.copy(value));
                                        }
                                    })
                                }
                            })
                            $scope.TotalBayar.BayarKhusus += parseInt(value.Nominal);
                        })
                        $scope.TotalBayar.IndexBayarKhusus = $scope.DatasTagihan.BayarKhusus.length;
                        angular.forEach($scope.DatasTagihan.BayarUmum, function (value, key) {
                            angular.forEach($scope.DataPembayaran.BayarUmum, function (value1, key1) {
                                if (value.IdBayarUmum == value1.IdBayarUmum) {
                                    angular.forEach($scope.DataPembayaran.JenisBayar, function (value2, key2) {
                                        if (value1.IdJenisBayar == value2.IdJenisBayar) {
                                            if (value2.Jenis == "Variable Cost (Per SKS)") {
                                                value.Jenis = "Variable Cost (" + $scope.sks + ")";
                                                value.Nominal = value.Nominal * $scope.sks;
                                                $scope.DataPrint.push(angular.copy(value));
                                            }
                                            else if (value2.Jenis == "Praktikum") {
                                                value.Jenis = value2.Jenis + " (" + $scope.Praktikum + ")";
                                                value.Nominal = value.Nominal * $scope.Praktikum;
                                                $scope.DataPrint.push(angular.copy(value));
                                            } else {
                                                value.Jenis = value2.Jenis;
                                                $scope.DataPrint.push(angular.copy(value));
                                            }
                                        }
                                    })
                                }
                            });
                            $scope.TotalBayar.BayarUmum += parseInt(value.Nominal);
                        });
                        $scope.TotalBayar.IndexBayarUmum = $scope.DatasTagihan.BayarUmum.length + 1;
                    } else {
                        alert("Mahasiswa Belum mengajukan KRS");
                    }
                })

            }
            $scope.Form = (set, item) => {
                if (set == 'Tambah') {
                    $scope.model = {};
                    $scope.title = "Tambah Pembayaran"
                    $("#TambahPembayaran").modal('show');
                } else {
                    $scope.model = item
                    $scope.title = "Ubah Pembayaran"
                    $("#TambahPembayaran").modal('show');
                }
            }
            $scope.GetTahunAjaran = () => {
                tagihankeuangan.GetTA().then(x => {
                    $scope.TA = x;
                })
            }

            $scope.Simpan = () => {
                SweetAlert.swal({
                    title: "Anda Yakin?",
                    text: "Anda akan Menajukan bukti pembayaran?",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#0be7fb",
                    confirmButtonText: "Yes, Simpan!",
                    cancelButtonText: "No, Batal!",
                    closeOnConfirm: false,
                    closeOnCancel: false,
                    showLoaderOnConfirm: true
                },
                    function (isConfirm) {
                        if (isConfirm) {
                            fileUpload.uploadbayar($scope.model.MyFile).then(Berkas => {
                                $scope.model.MyFile = Berkas;

                                tagihankeuangan.post($scope.model).then(x => {
                                    $scope.model.Berkas = angular.copy($scope.model.MyFile);
                                    $scope.model.IdTrxBayar = x.message;
                                    var a = "https://keuangan.stimiksepnop.ac.id/assets/berkas/" + angular.copy($scope.model.Berkas);
                                    fileToBase64.convert(a, function (base64Img) {
                                        $scope.model.File = base64Img;
                                    })
                                    $scope.model.file = $sce.trustAsResourceUrl(a);
                                    $scope.model.Status = 'Diajukan';
                                    delete $scope.model.MyFile;
                                    $scope.pembayaranMahasiswa.push(angular.copy($scope.model));
                                    SweetAlert.swal("Information!", "Berhasil", "success");
                                    $("#TambahPembayaran").modal('hide');
                                })
                            }, function (error) {
                                SweetAlert.swal("Approved!", "Gagal Menyimpan", "error");
                            });
                        } else {
                            SweetAlert.swal("Cancelled", "Your proses krsm has been cancelled :)", "error");
                        }
                    });
            }
            $scope.selected = function (item) {
                $scope.File = item.File;
            }

        });
})(window.angular); 