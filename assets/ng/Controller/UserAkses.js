(function (angular) {
    'use strict'
    angular.module("UserAkses", ["UserDirectives"])
        .controller("UserAksesController", function ($scope, UsersProses, SweetAlert) {
            $scope.DatasDosen = [];
            UsersProses.getUser().then(response => {
                $scope.DatasDosen = response;
                angular.forEach($scope.DatasDosen, function (value) {
                    if (value.userStatus == "true") {
                        value.userStatus = true;
                    } else if (value.userStatus == "false") {
                        value.userStatus = false;
                    }
                })
            }, error => {
                console.log(error);
            })
            $scope.changed = function (params) {
                SweetAlert.swal({
                    title: "Confirmation!!!",
                    text: "Anda akan mereset password milik " + params.Nama + "?",
                    type: "info",
                    showCancelButton: true,
                    confirmButtonColor: "#0be7fb",
                    confirmButtonText: "Yes, Ubah!",
                    cancelButtonText: "No, Batal!",
                    closeOnConfirm: false,
                    closeOnCancel: false,
                    showLoaderOnConfirm: true
                },
                    function (isConfirm) {
                        if (isConfirm) {
                            var a = {};
                            a.IdUser = params.IdUser;
                            a.Status = params.userStatus;
                            UsersProses.resetPass(a).then(response => {
                                SweetAlert.swal("Approved!", response.message, "success");
                            }, error => {
                                SweetAlert.swal("Gagal!!!", error.data.message, "error");
                            })
                        } else {
                            SweetAlert.swal("Cancelled", "Perubahan Password di batalkan:)", "error");
                        }
                        if (isConfirm) {
                            var a = {};
                            a.IdUser = params.IdUser;
                            a.Status = params.userStatus;
                            UsersProses.resetPass(a).then(response => {
                                SweetAlert.swal("Approved!", response.message, "success");
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