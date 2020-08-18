(function (angular) {
    'use strict'
    angular.module('DosenPengampu', ['DosenPengampuDirectives', 'helper.service'])
        .controller('DosenPengampuController', function ($scope, DosenAmpuServices, helperServices, SweetAlert) {
            $scope.helper = helperServices
            $scope.datas = [];
            $scope.model = {};
            $scope.prodi = {};
            $scope.matakuliah = {};
            $scope.dosen = {};
            $scope.kurikulum = {};
            DosenAmpuServices.get().then(x => {
                $scope.datas = x;
            })
            $scope.simpan = () => {
                SweetAlert.swal({
                    title: "Anda Yakin?",
                    text: "Anda akan menambahkan data?",
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
                            if ($scope.model.idpengampu) {
                                DosenAmpuServices.put($scope.model).then(x => {
                                    SweetAlert.swal({
                                        title: "Information",
                                        text: "Berhasil",
                                        type: "success",
                                        confirmButtonColor: "#0be7fb",
                                        confirmButtonText: "Yes",
                                    },
                                        function (isConfirm) {
                                            location.reload(true)
                                        });
                                })
                            } else {
                                DosenAmpuServices.post($scope.model).then(x => {
                                    SweetAlert.swal({
                                        title: "Information",
                                        text: "Berhasil",
                                        type: "success",
                                        confirmButtonColor: "#0be7fb",
                                        confirmButtonText: "Yes",
                                    },
                                        function (isConfirm) {
                                            location.reload(true)
                                        });
                                })
                            }
                        } else {
                            SweetAlert.swal("Cancelled", "Proses Dibatalkan :)", "error");
                        }
                    });
            }
        });
})(window.angular);