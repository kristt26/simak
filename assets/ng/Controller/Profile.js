(function (angular) {
    'use strict'
    angular.module('Profile', ['UserDirectives'])
        .controller('ProfileController', function ($scope, $http, $window, UsersProses, SweetAlert) {
            $scope.DatasProfile = {};
            $scope.DataPassword = {};
            $scope.Title = "";
            $scope.Username = "";
            $scope.showPegawai = false;
            $scope.showMahasiswa = false;
            $scope.DataPassword.OldPassword = "";
            $scope.passw1 = '';
            $scope.passw2 = '';
            $scope.DatasUser = {};
            $scope.edit = true;
            $scope.error = false;
            $scope.incomplete = true;
            $scope.hideform = true;
            $scope.$watch('passw2', function () { $scope.test(); });
            $scope.test = function () {
                if ($scope.passw1 !== $scope.passw2) {
                    $scope.error = true;
                } else {
                    $scope.error = false;
                }
                $scope.incomplete = false;
                if ($scope.edit && (!$scope.DataPassword.OldPassword.length ||
                    !$scope.passw1.length || !$scope.passw2.length)) {
                    $scope.incomplete = true;
                }
            };

            var Header = {
                "content-type": "application/json",
                "authorization": $window.sessionStorage.getItem("Token")
            }
            
          
            $scope.UbahPassword = function () {
                if ($scope.Username == "") {
                    SweetAlert.swal({
                        title: "Confirmation!!!",
                        text: "Anda Yakin ingin mengubah Password",
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
                                $scope.DataPassword.NewPassword = $scope.passw1;
                                UsersProses.post($scope.DataPassword).then(response => {
                                    SweetAlert.swal({
                                        title: "Berhasil!!!",
                                        text: response.message,
                                        type: "success",
                                        showCancelButton: false,
                                        confirmButtonColor: "#0be7fb",
                                        confirmButtonText: "Back to Login",
                                        closeOnConfirm: false
                                    },
                                        function () {
                                            $scope.DataPassword = {};
                                            $scope.error = true;
                                            $scope.passw1 = '';
                                            $scope.passw2 = '';
                                            window.location.href = "index.html";
                                        }
                                    );
                                }, error => {
                                    SweetAlert.swal("Gagal!!!", error.data.message, "error");
                                })
                            } else {
                                SweetAlert.swal("Cancelled", "Perubahan Password di batalkan:)", "error");
                            }
                        }
                    );
                } else {
                    SweetAlert.swal({
                        title: "Confirmation!!!",
                        text: "Anda Yakin ingin mengubah Username???",
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
                                a.Username = $scope.Username;
                                UsersProses.post(a).then(response => {
                                    SweetAlert.swal({
                                        title: "Berhasil!!!",
                                        text: response.message,
                                        type: "success",
                                        showCancelButton: false,
                                        confirmButtonColor: "#0be7fb",
                                        confirmButtonText: "Back to Login",
                                        closeOnConfirm: false
                                    },
                                        function () {
                                            $scope.Username = "";
                                            window.location.href = "index.html";
                                        }
                                    );
                                }, error => {
                                    SweetAlert.swal("Gagal!!!", error.data.message, "error");
                                })
                            } else {
                                SweetAlert.swal("Cancelled", "Perubahan Username di batalkan:)", "error");
                            }
                        }
                    );
                }
            }
            UsersProses.getBiodata().then(response => {
                $scope.DatasProfile = response;
                if ($scope.DatasProfile.Role == "Pegawai") {
                    $scope.showPegawai = true;
                    $scope.Title = "Biodata Pegawai";
                } else {
                    $scope.showMahasiswa = true;
                    $scope.Title = "Biodata Mahasiswa";
                }

            })
            $scope.UpdateProfile = function () {
                SweetAlert.swal({
                    title: "Confirmation!!!",
                    text: "Anda Yakin ingin mengubah Biodata???",
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
                            var Data = angular.copy($scope.DatasProfile);
                            if ($scope.showMahasiswa == true) {
                                Data.tglhr = $scope.DatasProfile.tglhr.getFullYear() + '-' + ($scope.DatasProfile.tglhr.getMonth() + 1) + '-' + $scope.DatasProfile.tglhr.getDate();
                                Data.tgdaftar = $scope.DatasProfile.tgdaftar.getFullYear() + '-' + ($scope.DatasProfile.tgdaftar.getMonth() + 1) + '-' + $scope.DatasProfile.tgdaftar.getDate();
                            } else {
                                Data.TanggalLahir = $scope.DatasProfile.TanggalLahir.getFullYear() + '-' + ($scope.DatasProfile.TanggalLahir.getMonth() + 1) + '-' + $scope.DatasProfile.TanggalLahir.getDate();
                            }
                            UsersProses.put(Data).then(response => {
                                SweetAlert.swal("Berhasil!!!", response, "success");
                            }, error => {
                                SweetAlert.swal("Gagal!!!", error, "error");
                            })
                        } else {
                            SweetAlert.swal("Cancelled", "Perubahan Biodata di batalkan:)", "error");
                        }
                    }
                );

            }
        })
})(window.angular);