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
            $scope.Testing = "Daftar Jadwal";
            JadwalKuliah.get().then(x => {
                $scope.datas = x;
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
                            var mulai = $scope.model.wm.toLocaleTimeString();
                            $scope.model.jammulai = mulai.replace('.', ':');
                            var selesai = $scope.model.ws.toLocaleTimeString();
                            $scope.model.jamselesai = selesai.replace('.', ':');

                            JadwalKuliah.post($scope.model).then(x => {
                                SweetAlert.swal("Approved!", "Proses berhasil", "success");
                                location.reload();
                            })
                        } else {
                            SweetAlert.swal("Cancelled", "Proses Dibatalkan :)", "error");
                        }
                    });
            }
        });
})(window.angular);