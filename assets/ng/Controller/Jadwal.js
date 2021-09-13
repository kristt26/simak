(function (angular) {
    'use strict'
    angular.module("Jadwal", ["JadwalKuliahDirectives", "helper.service"])
        .controller("JadwalController", function ($scope, JadwalKuliah, helperServices, SweetAlert) {
            $.LoadingOverlay("show", {
                image       : "",
                fontawesome : "fas fa-cog fa-spin"
            });
            $scope.helper = helperServices;
            $scope.model = {};
            $scope.prodi = {};
            $scope.matakuliah = {};
            $scope.dosen = {};
            $scope.kurikulum = {};
            $scope.datas = [];
            $scope.kurikulums = [];
            $scope.kelas = {};
            $scope.matakuliahs = {};
            $scope.Testing = "Daftar Jadwal";
            JadwalKuliah.get().then(x => {
                $scope.datas = x;
                console.log(x);
                $.LoadingOverlay("hide");
            })
            $scope.simpan = () => {
                SweetAlert.swal({
                    title: "Anda Yakin?",
                    text: "Anda akan menambahkan jadwal?",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#0be7fb",
                    confirmButtonText: "Yes",
                    cancelButtonText: "No",
                    closeOnConfirm: false,
                    closeOnCancel: false,
                    showLoaderOnConfirm: true
                },
                    function (isConfirm) {
                        if (isConfirm) {
                            var mulai = $scope.model.wm.getHours() + ":" + $scope.model.wm.getMinutes();
                            $scope.model.jammulai = mulai.replace('.', ':');
                            var selesai = $scope.model.ws.getHours() + ":" + $scope.model.ws.getMinutes();
                            $scope.model.jamselesai = selesai.replace('.', ':');
                            console.log($scope.model);

                            JadwalKuliah.post($scope.model).then(x => {
                                // console.log(x);
                                SweetAlert.swal("Approved!", "Proses berhasil", "success");
                                location.reload();
                            })
                        } else {
                            SweetAlert.swal("Cancelled", "Proses Dibatalkan :)", "error");
                        }
                    });
            }
            $scope.ubah=(item)=>{
                $scope.prodi = $scope.datas.prodi.find(x=>x.kdps = item.kdps);
                $scope.model.kdps = $scope.prodi.kdps;
                $scope.kurikulum = $scope.prodi.kurikulum.find(x=>x.kurikulum=item.kurikulum);
                $scope.matakuliah = $scope.kurikulum.matakuliah.find(x=>x.kmk = item.kmk);
                // dosens=matakuliah.dosen; model.sks=matakuliah.sks; model.thakademik=matakuliah.thakademik; model.gg=matakuliah.gg; model.kmk = matakuliah.kmk; model.nmmk=matakuliah.nmmk
                console.log(item);
                console.log($scope.prodi);
                console.log($scope.kurikulum);
                console.log($scope.matakuliah);
            }
            $scope.delete = (item)=>{
                SweetAlert.swal({
                    title: "Anda Yakin?",
                    text: "Anda akan menambahkan jadwal?",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#0be7fb",
                    confirmButtonText: "Yes",
                    cancelButtonText: "No",
                    closeOnConfirm: false,
                    closeOnCancel: false,
                    showLoaderOnConfirm: true
                },
                    function (isConfirm) {
                        if (isConfirm) {
                            JadwalKuliah.delete(item).then(x => {
                                SweetAlert.swal("Approved!", "Proses berhasil", "success");
                                console.log(x);
                                // location.reload();
                            })
                        } else {
                            SweetAlert.swal("Cancelled", "Proses Dibatalkan :)", "error");
                        }
                    });
            }
        });
})(window.angular);