(function (angular) {
    'use strict';
    angular.module("Apps", [
        "Ctrl", 
        "ngAnimate", 
        "ui.router", 
        "oitozero.ngSweetAlert", 
        "serviceFile", "datatables", 
        "ui.select2", 
        "ui.toggle", 
        "ngSanitize", 
        "datatables", 
        "ngResource"
    ])
        .config(function ($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise('Beranda');
            $stateProvider
                // HOME STATES AND NESTED VIEWS ========================================
                .state("Beranda", {
                    url: "/Beranda",
                    templateUrl: "apps/views/Beranda.html",
                    controller: "BerandaController"
                })
                .state("BaseProfile", {
                    url: "/baseprofile",
                    templateUrl: "apps/views/BaseProfile.html",
                    controller: "BaseProfileController"
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
                })
                .state("MahasiswaWali", {
                    url: "/MahasiswaWali",
                    templateUrl: "apps/views/MahasiswaWali.html",
                    controller: "MahasiswaWaliController"
                })
                .state("BeritaAcara", {
                    url: "/BeritaAcara",
                    templateUrl: "apps/views/BeritaAcara.html",
                    controller: "BeritaAcaraController"
                })
                .state("EvaluasiPembelajaran", {
                    url: "/EvaluasiPembelajaran",
                    templateUrl: "apps/views/EvaluasiPembelajaran.html",
                    controller: "EvaluasiPembelajaranController"
                })
                .state("UserAkses", {
                    url: "/UserAkses",
                    templateUrl: "apps/views/UserAkses.html",
                    controller: "UserAksesController"
                });
        })
        .run(['uiSelect2Config', function (uiSelect2Config) {
            uiSelect2Config.placeholder = "Placeholder text";
        }])
        
        .factory("AuthService", function ($window) {
            var service = {};
            service.Token = $window.sessionStorage.getItem("Token");
            service.Header = getHeader();
            // service.Base = "http://localhost/RestSimak/";
            service.Base = "https://www.restsimak.stimiksepnop.ac.id/";
            function getHeader() {
                var header = {
                    "content-type": "application/json",
                    "authorization": service.Token
                }
                return header;
            }
            return service;
        })
        .controller('View', function ($scope, $http, $window, SweetAlert, AuthService, covertFileGambar, fileToBase64) {
            $scope.header = "assets/Template/header.html";
            $scope.sidebar = "assets/Template/sidebar.html";
            $scope.content = "assets/Template/content.html";
            $scope.footer = "assets/Template/footer.html";
            $scope.setting = "assets/Template/setting.html";
            $scope.RoleAdmin = false;
            $scope.RoleMahasiswa = false;
            $scope.RoleDosen = false;
            $scope.RoleKaprodi = false;
            $scope.RoleWali = false;
            $scope.RoleBaak = false;
            $scope.RoleKeuangan = false;
            $scope.RoleUser = $window.sessionStorage.getItem("Role");
            $scope.NamaUser = $window.sessionStorage.getItem("NamaUser");
            $scope.dataGambar = "";
            $scope.Pict = "assets/dist/img/User_Circle.png";
            var a = JSON.parse($scope.RoleUser);
            var statusMahasiswa = false;
            angular.forEach(a, function (value) {
                if (value.Nama == "Mahasiswa") {
                    statusMahasiswa = true;
                }
            })
            function getHeader() {
                var header = {
                    "content-type": "text.plain",
                    "authorization": $window.sessionStorage.getItem("Token")
                }
                return header;
            }
            if ($window.sessionStorage.getItem("Username") == undefined || $window.sessionStorage.getItem("Username") == "" || $window.sessionStorage.getItem("Username") == null) {
                window.location.href = "index.html";
            } else {
                if (statusMahasiswa) {
                    var Url = AuthService.Base + "api/PenilaianDosen/CekPenilaianDosen?npm=" + $window.sessionStorage.getItem("Username");
                    $http({
                        method: "GET",
                        url: Url,
                        headers: AuthService.Header
                    }).then(function (response) {
                        if (response.data.message !== "Periode Evaluasi Telah Berakhir") {
                            if (response.data.message !== "Anda Sudah Melakukan Penilaian Dosen") {
                                // sessionStorage.clear();
                                SweetAlert.swal({
                                    title: "Information!",
                                    text: "Silahkan Lakukan Evaluasi Pembelajaran Dosen terlebih dahulu!!!",
                                    type: "info",
                                    showCancelButton: false,
                                    confirmButtonColor: "#DD6B55",
                                    confirmButtonText: "OK",
                                    closeOnConfirm: true
                                },
                                    function (isConfirm) {
                                        if (isConfirm) {
                                            window.location.href = "home.html#!/EvaluasiPembelajaran";
                                        }
                                    });
                            }
                        }
                        if(response.data.photo !== null){
                            var url = AuthService.Base + 'assets/file/photo/' + response.data.photo;
                            fileToBase64.convert(url, function (base64Img) {
                                $scope.Pict = base64Img;
                            })
                        }
                    });
                } else {
                    $http({
                        method: "GET",
                        url: AuthService.Base+"api/home/getHome?role=Pegawai",
                        headers: AuthService.Header,
                    }).then(function (response) {
                        if(response.data.data[0].photo !== null){
                            var url = AuthService.Base + 'assets/file/photo/' + response.data.data[0].photo;
                            fileToBase64.convert(url, function (base64Img) {
                                $scope.Pict = base64Img;
                            })
                        }
                    })
                }
                angular.forEach(a, function (value, key) {
                    if (value.Nama == "Mahasiswa") {
                        $scope.RoleMahasiswa = true;
                        $http({
                            method: "GET",
                            url: AuthService.Base + "api/jadwal/jadwalmahasiswa",
                            headers: getHeader()
                        }).then(function (response) {
                            if (response.data.set == 'Krsm') {
                                $scope.MenuMahasiswa = [
                                    { 'href': 'PengajuanKRS', 'Text': 'KRS', 'class': 'fa fa-file' },
                                    { 'href': 'EvaluasiPembelajaran', 'Text': 'Evaluasi Pembelajaran', 'class': 'fa fa-file' }
                                ]
                            } else {
                                $scope.MenuMahasiswa = [
                                    { 'href': 'PengajuanKRS', 'Text': 'Pengajuan KRS', 'class': 'fa fa-file' },
                                    { 'href': 'EvaluasiPembelajaran', 'Text': 'Evaluasi Pembelajaran', 'class': 'fa fa-file' }
                                ]
                            }
                        }, error => {
                            $scope.MenuMahasiswa = [
                                { 'href': 'PengajuanKRS', 'Text': 'Pengajuan KRS', 'class': 'fa fa-file' }
                            ]
                        });
    
                    } else if (value.Nama == "Prodi") {
                        $scope.RoleKaprodi = true;
                        $scope.MenuKaprodi = [
                            { 'href': 'ApprovedKRS', 'Text': 'Perwalian', 'SetStatus': value.Nama },
                            { 'href': 'GradeNilai', 'Text': 'Grade Nilai', 'SetStatus': value.Nama },
                            { 'href': 'Kurikulum', 'Text': 'Kurikulum', 'SetStatus': value.Nama },
                            { 'href': 'ConversiKHS', 'Text': 'Conversi KHS', 'SetStatus': value.Nama },
                            { 'href': 'BeritaAcara', 'Text': 'Berita Acara', 'SetStatus': value.Nama },
                            { 'href': 'Pengumuman', 'Text': 'Pengumuman', 'SetStatus': value.Nama }
    
                        ]
                    } else if (value.Nama == "Dosen") {
                        $scope.RoleDosen = true;
                        $scope.MenuDosen = [
                            { 'href': 'NilaiMahasiswa', 'Text': 'Input Nilai', 'SetStatus': value.Nama },
                            { 'href': 'Kurikulum', 'Text': 'Kurikulum', 'SetStatus': value.Nama }
                        ]
                    } else if (value.Nama == "Dosen Wali") {
                        $scope.RoleWali = true;
                        $scope.MenuWali = [
                            {
                                'href': 'ApprovedKRS', 'Text': 'ApprovedKRS', 'SetStatus': value.Nama
                            },
                            {
                                'href': 'MahasiswaWali', 'Text': 'Mahasiswa Wali', 'SetStatus': value.Nama
                            }
                        ]
                    } else if (value.Nama == "Ka Baak") {
                        $scope.RoleKaBaak = true;
                        $scope.MenuKaBaak = [
                            { 'href': 'UserAkses', 'Text': 'User', 'SetStatus': value.Nama },
                            { 'href': 'Pengumuman', 'Text': 'Pengumuman', 'SetStatus': value.Nama },
                            { 'href': 'BeritaAcara', 'Text': 'Berita Acara', 'SetStatus': value.Nama }
                        ]
                    } else if (value.Nama == "Keuangan") {
                        $scope.RoleKeuangan = true;
                        $scope.MenuKeuangan = [{ 'href': 'ApprovedKRS', 'Text': 'ApprovedKRS', 'SetStatus': value.Nama }, { 'href': 'BeritaAcara', 'Text': 'Berita Acara', 'SetStatus': value.Nama }]
                    } else if (value.Nama == "Kemahasiswaan") {
                        $scope.RoleKemahasiswaan = true;
                        $scope.MenuKemahasiswaan = [{ 'href': 'BidikMisi', 'Text': 'Bidik Misi', 'SetStatus': value.Nama }]
                    }
                    else {
                        $scope.RoleAdmin = true;
                    }
                });
            }
            


            $scope.uploadFotoProfile = function (data) {




            }


            $scope.SetStatus = function (item) {
                $window.sessionStorage.setItem("SetStatus", item);
            }

            $scope.Logout = function () {
                sessionStorage.clear();
                window.location.href = "index.html";
            }
        })
        .controller("Login", function (
            $scope, $http, $window, AuthService, SweetAlert
        ) {
            $scope.DataInput = {};
            $scope.ProsesLogin = function (response) {
                // SweetAlert.swal("Information!", "Sistem Lagi Maintenance", "success");
                $http({
                    method: "POST",
                    url: AuthService.Base + "api/users/login",
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
        })

        ;
})(window.angular);