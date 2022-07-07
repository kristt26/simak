(function (angular) {
    'use strict'
    angular.module("MahasiswaWali", ["MahasiswaWaliDirective", "ProdiDirectives"])
        .controller("MahasiswaWaliController", function ($scope, $http, WaliMahasiswa, $window) {
            $scope.DataWali = [];
            $scope.ListMonitoring = [];
            WaliMahasiswa.getMahasiswa().then(response => {
                $scope.DataWali = response;
                WaliMahasiswa.getList().then(response => {
                    $scope.ListMonitoring = response.data.data;
                });
            }, error => {
                console.log(error);
            });

            $scope.showNilai=(item)=>{
                $window.open('https://www.simak1011.stimiksepnop.ac.id/transkip.php?npm='+item.npm, '_blank');
            }

            
        })
        .controller("mahasiswaProdiController", function ($scope, $http, WaliMahasiswa) {
            $scope.DataWali = [];
            $scope.ListMonitoring = [];
            WaliMahasiswa.mahasiswaProdi().then(response => {
                $scope.ListMonitoring = response.warning.data;
                $scope.DataWali = response.mahasiswa;
            });
            // WaliMahasiswa.getMahasiswa().then(response => {
            //     $scope.DataWali = response;
            // }, error => {
            //     console.log(error);
            // });
        })
        .controller("DosenWaliController", function($scope, ProdiServices){
            $scope.titleForm = "Tambah";
            $scope.model = {};
            ProdiServices.get().then(res=>{
                $scope.prodis = res.prodi;
                $scope.dosens = res.dosen;
                $scope.mahasiswas = res.mahasiswa;
                $scope.ta = res.ta;
            })

            $scope.getMhs = (kdps, iddosen)=>{
                if(kdps && iddosen){
                    ProdiServices.getByDosen({kdps:kdps, iddosen:iddosen}).then(res=>{
                        $scope.datas = res;
                        console.log(res);
                    })
                }
            }
            $scope.save = ()=>{
                $scope.model.thakademik = $scope.ta.thakademik;
                $scope.model.gg = $scope.ta.gg;
                ProdiServices.post($scope.model).then(res=>{

                })
            }
        });
})(window.angular);