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
                    SweetAlert.swal(error.data.message,"" , "error");
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
        .controller('NilaiAllMahasiswaController', function ($scope, KhsmServicee, GradeNilaiService, SweetAlert, DosenAmpuServices) {
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

            $scope.setDosen = (item)=>{
                $scope.SelectedMatakuliah.nmdsn=item.nmdsn;
                $scope.SelectedMatakuliah.nidn=item.nidn;
                $("#dsnsaji").modal('hide');
                $scope.Show = true;
            }

            $scope.GetMahasiswa = function () {
                $scope.Show = false;
                var a = JSON.parse($scope.SelectedMatakuliah);
                $scope.SelectedMatakuliah = a;
                $scope.Tanggal = new Date();
                DosenAmpuServices.bymk($scope.SelectedMatakuliah.kmk).then(res=>{
                    $scope.dosenPengampu=res;
                    console.log($scope.dosenPengampu);
                    $("#dsnsaji").modal('show');
                })
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
                                KhsmServicee.getAll().then(response => {
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
                        $scope.link = "https://www.simak.usn-papua.ac.id/transkip.php?npm=" + $scope.npm;
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
        })
        .controller('progressNilaiController', function ($scope, KhsmServicee, SweetAlert) {
            $scope.datas = [];
            $scope.SelectedMatakuliah = "";
            $scope.GradeNilai = [];
            $scope.Nilai = 0;
            $scope.Show = false;
            $scope.Tombol = true;

            KhsmServicee.getProgress().then(response => {
                $scope.datas = response;
                $scope.totalMahasiswa = $scope.datas.reduce((accumulate, object)=>{
                    return accumulate + parseFloat(object.total);
                }, 0);
                $scope.totalLulus = $scope.datas.reduce((accumulate, object)=>{
                    return accumulate + parseFloat(object.lulus);
                }, 0);;
                $scope.totalPresentase = Math.round(($scope.totalLulus/$scope.totalMahasiswa*100)*1000)/1000;
                // console.log(response);
            }, error => {
                SweetAlert.swal(error.data.message,"" , "error");
            })

            $scope.persen = (n1,n2)=>{
                if(parseInt(n1)!=0) return Math.round((parseFloat(n1)/parseFloat(n2)*100)*100)/100 ;
                else return 0.00;
            }

            $scope.print = () => {
                // var OPTION = {mode:"popup", popHt: 500, popWd: 400,popX: 500,popY: 600, popClose: true, strict: undefined};
                $("#print").printArea();
            }
            $scope.printForm = () => {
                // var OPTION = {mode:"popup", popHt: 500, popWd: 400,popX: 500,popY: 600, popClose: true, strict: undefined};
                $("#print1").printArea();
            }
        });
})(window.angular);