(function (angular) {
    'use strict'
    angular.module('ApprovedKRS', ['ApprovedDirectives', 'JadwalDirectives', 'KemajuanStudiDirective'])
        .controller('ApprovedKRSController', function ($scope, ApprovedService, $window, Jadwal, $filter, $http, KhsmService, SweetAlert, DTOptionsBuilder, DTColumnDefBuilder) {
            $scope.ShowKeuangan = false;
            $scope.ShowWali = false;
            var DataStatus = {};
            $scope.DatasJadwal = [];
            $scope.SearchText = "";
            $scope.CariKemajuan = "";
            $scope.CariJadwal = "";
            $scope.Kelas = "";
            $scope.TampilJadwal = false;
            $scope.Datatampung = [];
            $scope.jmsks = 0;
            $scope.NamaSelected = "";
            $scope.NPMSelected = "";
            $scope.KemajuanStudi = [];
            $scope.Tombol = false;
            $scope.Histori = [];
            DataStatus.status = $window.sessionStorage.getItem("SetStatus");
            $scope.dtOptions = DTOptionsBuilder.newOptions().withPaginationType('full_numbers').withDisplayLength(2);
            $scope.dtColumnDefs = [
                DTColumnDefBuilder.newColumnDef(0),
                DTColumnDefBuilder.newColumnDef(1).notVisible(),
                DTColumnDefBuilder.newColumnDef(2).notSortable()
            ];
            if (DataStatus.status == "Dosen Wali" || DataStatus.status == "Prodi") {
                $scope.ShowKeuangan = false;
                $scope.ShowWali = true;

                Jadwal.get().then(response => {
                    $scope.DatasJadwal = JSON.parse(response.data);
                }, error => {
                    console.log(error);
                });
                ApprovedService.get(DataStatus).then(response => {
                    $scope.jmsks = 0;
                    $scope.TemKrsm = response.data.TemKrsm;
                    $scope.Histori = response.data.Histori;
                }, error => {
                    alert(error.data);
                });

            } else {
                $scope.ShowKeuangan = true;
                $scope.ShowWali = false;
                ApprovedService.get(DataStatus).then(response => {
                    $scope.TemKrsm = response.data.TemKrsm;
                    $scope.Histori = response.data.Histori;
                }, error => {
                    alert(error.data);
                });
            }

            $scope.ShowJadwalMahasiswa = function (item) {
                $scope.jmsks = 0;
                $scope.NamaSelected = item.nmmhs;
                $scope.NPMSelected = item.npm;
                $scope.TampilJadwal = true;
                $scope.DatasTampil = angular.copy($scope.DatasJadwal);
                $scope.Datatampung = item.detailTemKrsm[0];
                var data = {};
                data.npm = item.npm;
                KhsmService.get(data).then(response => {
                    var b = response.data;
                    $scope.KemajuanStudi.Datas = [];
                    angular.forEach(b.Datas, function (value, key) {
                        $scope.KemajuanStudi.Datas.push(angular.copy(value));
                        $scope.KemajuanStudi.IPK = b.IPK;
                        $scope.KemajuanStudi.SKS = b.SKS;
                    });
                }, error => {
                    console.log(error);
                })

                angular.forEach($scope.Datatampung, function (value, key) {
                    $scope.jmsks += parseInt(value.sks);
                    angular.forEach($scope.DatasTampil, function (value1, key1) {
                        if (value.kmk == value1.kmk && value.kelas == value1.kelas) {
                            value.ruangan = value1.ruangan;
                            value.hari = value1.hari;
                            value.wm = value1.wm;
                            value.ws = value1.ws;
                            value.dsn_saji = value1.dsn_saji;
                        }
                    });
                });
            }
            $scope.Approved = function (item) {
                $scope.Tombol = true;
                if ($scope.jmsks != NaN) {
                    SweetAlert.swal({
                        title: "Anda Yakin?",
                        text: "Anda akan Menyetujui KRSM Mahasiswa: " + item.nmmhs,
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
                                ApprovedService.put(item).then(response => {
                                    var index = $scope.TemKrsm.findIndex(TemKrsm => TemKrsm.Id == item.Id);
                                    $scope.TemKrsm.splice(index, 1);
                                    SweetAlert.swal("Approved!", "Your proses krsm has been approved.", "success");
                                    $scope.Histori.push(angular.copy(item));
                                    $scope.TampilJadwal = false;
                                    DataStatus = {};
                                    $scope.Datatampung = [];
                                    $scope.Tombol = false;
                                }, error => {
                                    var index = $scope.TemKrsm.findIndex(TemKrsm => TemKrsm.Id == item.Id);
                                    $scope.TemKrsm.splice(index, 1);
                                    $scope.Histori.push(angular.copy(item));
                                    alert(response.message);
                                    $scope.TampilJadwal = false;
                                    DataStatus = {};
                                    $scope.Datatampung = [];
                                    $scope.jmsks = 0;
                                    SweetAlert.swal("Approved!", "Your proses krsm has been approved.", "success");
                                    $scope.Tombol = false;
                                })

                            } else {
                                SweetAlert.swal("Cancelled", "Your proses krsm has been cancelled :)", "error");
                                $scope.Tombol = false;
                            }
                        });
                } else {
                    SweetAlert.swal("Cancelled", "Ada baris kosong pada KRS Mahasiswa yang bersangkutan, Mohon mahasiswa menghapus baris tersebut", "error");
                }
            }
        });
})(window.angular);