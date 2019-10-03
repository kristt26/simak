(function (angular) {
    'use strict';
    angular.module("Apps", ["Ctrl", "ngAnimate", "ui.router", "oitozero.ngSweetAlert"])
        .config(function ($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise('Main');
            $stateProvider
                // HOME STATES AND NESTED VIEWS ========================================
                .state("Main", {
                    url: "/Main",
                    templateUrl: "apps/views/main.html",
                    controller: "MainController"
                })
                .state("Pegawai", {
                    url: "/Pegawai",
                    templateUrl: "apps/views/Pegawai.html",
                    controller: "PegawaiController"
                })
                .state("Jabatan", {
                    url: "/Jabatan",
                    templateUrl: "apps/views/Jabatan.html",
                    controller: "JabatanController"
                })
                .state("Mahasiswa", {
                    url: "/Mahasiswa",
                    templateUrl: "apps/views/Mahasiswa.html",
                    controller: "MahasiswaController"
                })
                .state("Jadwal", {
                    url: "/Jadwal",
                    templateUrl: "apps/views/Jadwal.html",
                    controller: "JadwalController"
                })
                .state("Prodi", {
                    url: "/Prodi",
                    templateUrl: "apps/views/Prodi.html",
                    controller: "ProdiController"
                })
                .state("TahunAkademik", {
                    url: "/TahunAkademik",
                    templateUrl: "apps/views/TahunAkademik.html",
                    controller: "TahunAkademikController"
                })
                .state("GradeNilai", {
                    url: "/GradeNilai",
                    templateUrl: "apps/views/GradeNilai.html",
                    controller: "GradeNilaiController"
                })
                .state("Kurikulum", {
                    url: "/Kurikulum",
                    templateUrl: "apps/views/Kurikulum.html",
                    controller: "KurikulumController"
                })
                .state("KemajuanStudi", {
                    url: "/KemajuanStudi",
                    templateUrl: "apps/views/KemajuanStudi.html",
                    controller: "KemajuanStudiController"
                })
                .state("ApprovedKRS", {
                    url: "/ApprovedKRS",
                    templateUrl: "apps/views/ApprovedKRS.html",
                    controller: "ApprovedKRSController"
                })
                .state("NilaiMahasiswa", {
                    url: "/NilaiMahasiswa",
                    templateUrl: "apps/views/NilaiMahasiswa.html",
                    controller: "NilaiMahasiswaController"
                })
                .state("ConversiKHS", {
                    url: "/ConversiKHS",
                    templateUrl: "apps/views/ConversiKHS.html",
                    controller: "ConversiKHSController"
                })
                .state("Pengumuman", {
                    url: "/Pengumuman",
                    templateUrl: "apps/views/Pengumuman.html",
                    controller: "PengumumanController"
                })
                .state("BidikMisi", {
                    url: "/BidikMisi",
                    templateUrl: "apps/views/BidikMisi.html",
                    controller: "BidikMisiController"
                })
                .state("PengajuanKRS", {
                    url: "/PengajuanKRS",
                    templateUrl: "apps/views/PengajuanKRS.html",
                    controller: "PengajuanKRSController"
                })
                .state("Laporan", {
                    url: "/Laporan",
                    templateUrl: "apps/views/Laporan.html",
                    controller: "LaporanController"
                })
                .state("Profile", {
                    url: "/Profile",
                    templateUrl: "apps/views/Profile.html",
                    controller: "ProfileController"
                })
                .state("Histori", {
                    url: "/Histori",
                    templateUrl: "apps/views/Histori.html",
                    controller: "HostoriController"
                })
                .state("Penelitian", {
                    url: "/Penelitian",
                    templateUrl: "apps/views/PenelitianMahasiswa.html",
                    controller: "PenelitianController"
                });

           
        })
        .factory("AuthService", function ($window) {
            var service = {};
            service.Token = $window.sessionStorage.getItem("Token");
            service.Header = getHeader();
            service.Base = "http://restsimak.stimiksepnop.ac.id/";
            function getHeader() {
                var header = {
                    "content-type": "application/json",
                    "authorization": service.Token
                }
                return header;
            }
            return service;
        })
        .controller('View', ['$scope', '$http', '$window', function ($scope, $http, $window, $route) {
            $scope.header = "assets/template/header.html";
            $scope.sidebar = "assets/template/sidebar.html";
            $scope.content = "assets/template/content.html";
            $scope.footer = "assets/template/footer.html";
            $scope.setting = "assets/template/setting.html";
            $scope.RoleAdmin = false;
            $scope.RoleMahasiswa = false;
            $scope.RoleDosen = false;
            $scope.RoleKaprodi = false;
            $scope.RoleWali = false;
            $scope.RoleBaak = false;
            $scope.RoleKeuangan = false;
            $scope.RoleUser = $window.sessionStorage.getItem("Role");
            $scope.NamaUser = $window.sessionStorage.getItem("NamaUser");
            function getHeader() {
                var header = {
                    "content-type": "application/json",
                    "authorization": $window.sessionStorage.getItem("Token")
                }
                return header;
            }
            if($window.sessionStorage.getItem("Username")==undefined || $window.sessionStorage.getItem("Username")=="" || $window.sessionStorage.getItem("Username")==null){
                window.location.href="index.html";
            }
            var a = JSON.parse($scope.RoleUser);
            angular.forEach(a, function (value, key) {
                if (value.Nama == "Mahasiswa") {
                    $scope.RoleMahasiswa = true;
                    $http({
                        method: "GET",
                        url: "http://restsimak.stimiksepnop.ac.id/api/jadwal/jadwalmahasiswa",
                        headers: getHeader()
                    }).then(function (response) {
                        if (response.data.set == 'Krsm') {
                            $scope.MenuMahasiswa = [
                                { 'href': 'PengajuanKRS', 'Text': 'KRS' },
                                { 'href': 'Penelitian', 'Text': 'Penelitian Mahasiswa' }
                            ]
                        } else
                        {
                            $scope.MenuMahasiswa = [
                                { 'href': 'PengajuanKRS', 'Text': 'Pengajuan KRS' }
                            ]
                        }
                    }, error => {
                        $scope.MenuMahasiswa = [
                            { 'href': 'PengajuanKRS', 'Text': 'Pengajuan KRS' },
                            { 'href': 'Penelitian', 'Text': 'Penelitian Mahasiswa' }
                        ]
                    });
                    
                } else if (value.Nama == "Prodi") {
                    $scope.RoleKaprodi = true;
                    $scope.MenuKaprodi = [
                        { 'href': 'ApprovedKRS', 'Text': 'Perwalian', 'SetStatus': value.Nama },
                        { 'href': 'GradeNilai', 'Text': 'Grade Nilai', 'SetStatus': value.Nama },
                        { 'href': 'Kurikulum', 'Text': 'Kurikulum', 'SetStatus': value.Nama },
                        { 'href': 'ConversiKHS', 'Text': 'Conversi KHS', 'SetStatus': value.Nama }
                    ]
                } else if (value.Nama == "Dosen") {
                    $scope.RoleDosen = true;
                    $scope.MenuDosen = [
                        { 'href': 'GradeNilai', 'Text': 'Input Nilai', 'SetStatus': value.Nama },
                        { 'href': 'Kurikulum', 'Text': 'Kurikulum', 'SetStatus': value.Nama }
                    ]
                } else if (value.Nama == "Dosen Wali") {
                    $scope.RoleWali = true;
                    $scope.MenuWali = [{ 'href': 'ApprovedKRS', 'Text': 'ApprovedKRS', 'SetStatus': value.Nama }]
                } else if (value.Nama == "Baak") {
                    $scope.RoleBaak = true;
                } else if (value.Nama == "Keuangan") {
                    $scope.RoleKeuangan = true;
                    $scope.MenuKeuangan = [{ 'href': 'ApprovedKRS', 'Text': 'ApprovedKRS', 'SetStatus': value.Nama }]
                } else if(value.Nama == "Kemahasiswaan"){
                    $scope.RoleKemahasiswaan = true;
                    $scope.MenuKemahasiswaan = [{ 'href': 'BidikMisi', 'Text': 'Bidik Misi', 'SetStatus': value.Nama }]
                }
                else {
                    $scope.RoleAdmin = true;
                }
            });
           
            $scope.SetStatus = function (item) {
                $window.sessionStorage.setItem("SetStatus", item);
            }

            $scope.Logout= function(){
                sessionStorage.clear();
                window.location.href="index.html";
            }
        }])
        .controller("Login", ['$scope', '$http', '$window', function (
            $scope, $http, $window
        ) {
            $scope.DataInput = {};
            $scope.ProsesLogin = function (response) {
                $http({
                    method: "POST",
                    url: "http://restsimak.stimiksepnop.ac.id//api/users/login",
                    header: {
                        "content-type": "application/json",
                    },
                    data: $scope.DataInput
                }).then(function (response) {
                    if (response.data.status)
                        var Tampung = response.data;
                    var j = Tampung.data;
                    var Datarole = JSON.stringify(j.RoleUser.Role);
                    $window.sessionStorage.setItem("Token", j.Token);
                    $window.sessionStorage.setItem("Username", j.Username);
                    $window.sessionStorage.setItem("Email", j.Email);
                    $window.sessionStorage.setItem("NamaUser", j.NamaUser);
                    $window.sessionStorage.setItem("Role", Datarole);
                    window.location.href = "home.html";
                }, function (error) {
                    console.log(error);
                    alert(error.data.message);
                })
            }
        }])
        ;
})(window.angular);