(function (angular) {
    'use strict'
    angular.module('Pengumuman', ['PengumumanDirectives'])
        .controller('PengumumanController', function ($scope, fileUpload, fileDelete, $sce, PengumumanService, SweetAlert, AuthService, fileToBase64) {
            $scope.Testing = 'Data Pengumuman';
            $scope.input = {};
            $scope.dataPengumuman = [];
            $scope.File;
            PengumumanService.get().then(response => {
                angular.forEach(response, function (value) {
                    var a = AuthService.Base + 'assets/file/pengumuman/' + angular.copy(value.berkas);
                    fileToBase64.convert(a, function (base64Img) {
                        value.File = base64Img;
                    })
                    value.file = $sce.trustAsResourceUrl(a);
                })
                $scope.dataPengumuman = response;
            })
            $scope.selected = function (item) {
                $scope.File = item.File;
            }
            $scope.Hapus = function(item){
                SweetAlert.swal({
                    title: "Anda Yakin?",
                    text: "Menghapus data pengumuman",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#0be7fb",
                    confirmButtonText: "Yes, Hapus!",
                    cancelButtonText: "No, Batal!",
                    closeOnConfirm: false,
                    closeOnCancel: false,
                    showLoaderOnConfirm: true
                },
                    function (isConfirm) {
                        if (isConfirm) {
                            var file = $scope.myFile;
                            var set = 'pengumuman';
                            PengumumanService.delete(item.id).then(response => {
                                fileDelete.delete(item.berkas, set).then(response => {
                                    var index = $scope.dataPengumuman.indexOf(item);
                                    $scope.dataPengumuman.splice(index, 1);
                                    SweetAlert.swal("Information!", "Data di hapus", "success");
                                })
                            }, error => {
                                SweetAlert.swal("Cancelled", "Gagal Menghapus!!! :)", "error");
                            })
                        } else {
                            SweetAlert.swal("Cancelled", "Your proses krsm has been cancelled :)", "error");
                        }
                    });
            }
            $scope.Simpan = function () {
                SweetAlert.swal({
                    title: "Anda Yakin?",
                    text: "Anda akan Menambah data pengumuman",
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
                            var file = $scope.myFile;
                            var set = 'pengumuman';
                            console.log('file is ');
                            console.dir(file);
                            fileUpload.upload(file, set).then(response => {
                                var a = response;
                                $scope.input.berkas = angular.copy(response);
                                PengumumanService.post($scope.input).then(response => {
                                    $scope.input.id = angular.copy(response);
                                    var a = AuthService.Base + 'assets/file/pengumuman/' + angular.copy($scope.input.berkas);
                                    fileToBase64.convert(a, function (base64Img) {
                                        $scope.input.File =  base64Img;
                                    })
                                    $scope.input.file = $sce.trustAsResourceUrl(a);
                                    $scope.dataPengumuman.push(angular.copy($scope.input));
                                    SweetAlert.swal("Information!", "Your proses krsm has been approved.", "success");
                                    $scope.input ={};
                                }, error => {
                                    fileDelete.delete(set, $scope.input.berkas).then(response => {
                                        SweetAlert.swal("Approved!", "Gagal Menyimpan", "error");
                                    }, error => {

                                    })
                                })
                            }, function (error) {
                                SweetAlert.swal("Approved!", "Gagal Menyimpan", "error");
                            });
                        } else {
                            SweetAlert.swal("Cancelled", "Your proses krsm has been cancelled :)", "error");
                        }
                    });

            };
        });
})(window.angular); 