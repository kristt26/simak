(function (angular) {
    'use strict'
    angular.module('DosenPengampu', ['DosenPengampuDirectives', 'helper.service'])
        .controller('DosenPengampuController', function ($scope, DosenAmpuServices, helperServices, SweetAlert) {
            $scope.helper = helperServices
            $scope.datas = [];
            $scope.model = {};
            $scope.prodi = {};
            $scope.matakuliah = {};
            $scope.matakuliahs = [];
            $scope.dosen = {};
            $scope.kurikulum = {};
            $scope.kurikulums = [];
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
                            console.log($scope.model);
                            if ($scope.model.idpengampu) {
                                DosenAmpuServices.put($scope.model).then(x => {
                                    $scope.model = {};
                                    $scope.prodi = {};
                                    $scope.matakuliah = {};
                                    $scope.matakuliahs = [];
                                    $scope.dosen = {};
                                    $scope.kurikulum = {};
                                    $scope.kurikulums = [];
                                    SweetAlert.swal("Information", "Proses berhasil", "success");
                                    $("#editPengampu").modal('hide');
                                })
                            } else {
                                DosenAmpuServices.post($scope.model).then(x => {
                                    $scope.model = {};
                                    $scope.prodi = {};
                                    $scope.matakuliah = {};
                                    $scope.matakuliahs = [];
                                    $scope.dosen = {};
                                    $scope.kurikulum = {};
                                    $scope.kurikulums = [];
                                    SweetAlert.swal("Information", "Proses berhasil", "success");
                                })
                            }
                        } else {
                            SweetAlert.swal("Cancelled", "Proses Dibatalkan :)", "error");
                        }
                    });
            }

            $scope.ubah = (item)=>{
                $scope.model = item;
                $scope.dosen = $scope.datas.dosen.find(x=>x.iddosen==item.iddosen);
                $scope.prodi = $scope.datas.prodi.find(x=>x.kdps==item.kdps);
                $scope.kurikulums = $scope.prodi.kurikulum;
                $scope.prodi.kurikulum.forEach(element => {
                    element.matakuliah.forEach(mat => {
                        if(mat.kmk === item.kmk){
                            $scope.matakuliahs = element.matakuliah;
                            $scope.kurikulum = $scope.prodi.kurikulum.find(x=>x.kurikulum==mat.kurikulum);
                            $scope.matakuliah = mat;
                        }
                    });
                });
                // console.log($scope.dosen);
                console.log(item);
                $("#editPengampu").modal('show');
            }
        });
})(window.angular);

// {
//     "nidn": "1219028401",
//     "iddosen": "50",
//     "kdps": "55420",
//     "thakademik": "2021/2022",
//     "gg": "GANJIL",
//     "idtahunakademik": "22",
//     "kmk": "111042",
//     "nmmk": "ALGORITMA DAN PEMROGRAMAN [+] (KBR)",
//     "idmatakuliah": "61",
//     "jenis": "DOSEN",
//     "mengajar": "Y"
// }