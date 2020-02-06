(function (angular) {
    'use strict'
    angular.module("UserAkses", ["UserDirectives", "MahasiswaDirectives"])
        .controller("UserAksesController", function ($scope, UsersProses, SweetAlert, DTOptionsBuilder, DTColumnDefBuilder, MahasiswaService) {
            $scope.DatasDosen = [];
            $scope.DatasRole = [];
            $scope.DatasMahasiswa =[];
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
            MahasiswaService.get().then(response=>{
                $scope.DatasMahasiswa =response.data;
                angular.forEach($scope.DatasMahasiswa, function (value) {
                    if (value.userStatus == "true") {
                        value.userStatus = true;
                    } else if (value.userStatus == "false") {
                        value.userStatus = false;
                    }
                })
            })
            $scope.dtOptions = DTOptionsBuilder.newOptions().withPaginationType('full_numbers').withDisplayLength(2);
            $scope.dtColumnDefs = [
                DTColumnDefBuilder.newColumnDef(0),
                DTColumnDefBuilder.newColumnDef(1).notVisible(),
                DTColumnDefBuilder.newColumnDef(2).notSortable()
            ];

            $scope.Activate = function(params){
                var message;
                if(params.userStatus==true){
                    message = "Mengaktifkan user milik ";
                }else{
                    message = "Menonaktifkan user milik ";
                }
                SweetAlert.swal({
                    title: "Confirmation!!!",
                    text: "Anda akan "+ message + params.Nama + "?",
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
                            UsersProses.putUser(a).then(response => {
                                SweetAlert.swal("Approved!", response.message, "success");
                            }, error => {
                                SweetAlert.swal("Gagal!!!", error.data.message, "error");
                            })
                        } else {
                            SweetAlert.swal("Cancelled", "Perubahan Password di batalkan:)", "error");
                        }
                    });
            }

            $scope.Reset = function (params) {
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
                    });
            }
            $scope.GetRole = function(params) {
                $scope.DatasRole =[];
                UsersProses.getRole().then(response =>{
                    angular.forEach(response, function(value1) {
                        value1.status = false;
                        
                        angular.forEach(params.Role, function(value){
                            value1.IdUser = value.IdUser;
                            if(value1.Id==value.Id){
                                value1.status = true;
                            }
                        })                        
                    })
                    $scope.DatasRole = response;
                })
            }
            $scope.changedRole = function(item){
                SweetAlert.swal({
                    title: "Confirmation!!!",
                    text: "Anda Yakin?",
                    type: "info",
                    showCancelButton: true,
                    confirmButtonColor: "#0be7fb",
                    confirmButtonText: "Yes, Yakin!",
                    cancelButtonText: "No, Tidak!",
                    closeOnConfirm: false,
                    closeOnCancel: false,
                    showLoaderOnConfirm: true
                },
                    function (isConfirm) {
                        if (isConfirm) {
                            UsersProses.postUserinRole(item).then(response => {
                                SweetAlert.swal("Approved!", response.message, "success");
                            }, error =>{
                                SweetAlert.swal("Gagal!!!", error.data.message, "error");
                            });
                        } else {
                            SweetAlert.swal("Cancelled", "Perubahan Password di batalkan:)", "error");
                        }
                       
                    });
                
            }
        });
})(window.angular);