(function (angular) {
    'use strict'
    angular.module('ApprovedKRS', ['ApprovedDirectives', 'JadwalDirectives', 'KemajuanStudiDirective'])
        .controller('ApprovedKRSController', function ($scope, ApprovedService, $window, Jadwal, $filter, $http, KhsmService, SweetAlert) {
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
            DataStatus.status = $window.sessionStorage.getItem("SetStatus");
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
                }, error => {
                    alert(error.data);
                });

            } else {
                $scope.ShowKeuangan = true;
                $scope.ShowWali = false;
                ApprovedService.get(DataStatus).then(response => {
                    $scope.TemKrsm = response.data.TemKrsm;
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
                // $scope.DatasTampil = $filter('filter')(angular.copy($scope.DatasJadwal), function (value) {
                //     return value.kelas === item.kelas;
                // });
                $scope.Datatampung = item.detailTemKrsm[0];
                var data = {};
                data.npm = item.npm;
                KhsmService.get(data).then(response => {
                    var b = response.data;
                    $scope.KemajuanStudi.Datas = [];
                    angular.forEach(b.Datas, function (value, key) {
                        var a = JSON.parse(value);
                        $scope.KemajuanStudi.Datas.push(angular.copy(a));
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
                            // value1.status = true;
                            // value1.ngBinding = "success";
                        }
                    });
                });
            }

            $scope.Pilih = function (item) {
                $http({
                    method: "POST",

                })
            }
            $scope.Approved = function (item) {
                $scope.Tombol = true;
                SweetAlert.swal({
                    title: "Anda Yakin?",
                    text: "Anda akan Menyetujui KRSM Mahasiswa: " + item.nmmhs,
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
                            ApprovedService.put(item).then(response => {
                                var index = $scope.TemKrsm.findIndex(TemKrsm => TemKrsm.Id == item.Id);
                                $scope.TemKrsm.splice(index, 1);
                                SweetAlert.swal("Approved!", "Your proses krsm has been approved.", "success");
                                $scope.TampilJadwal = false;
                                $scope.DatasJadwal = [];
                                DataStatus = {};
                                $scope.Datatampung = [];
                                $scope.Tombol = false;
                            }, error => {
                                var index = $scope.TemKrsm.findIndex(TemKrsm => TemKrsm.Id == item.Id);
                                $scope.TemKrsm.splice(index, 1);
                                alert(response.message);
                                $scope.TampilJadwal = false;
                                $scope.DatasJadwal = [];
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
            }
        });
})(window.angular);