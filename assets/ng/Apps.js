(function (angular) {
    'use strict';
    angular.module("Apps", ["Ctrl", "ngAnimate", "ui.router", "oitozero.ngSweetAlert", "datatables", "ui.select2", "ui.toggle", "ngSanitize", "datatables", "ngResource"])
        .config(function ($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise('Beranda');
            $stateProvider
                // HOME STATES AND NESTED VIEWS ========================================
                .state("Beranda", {
                    url: "/Main",
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
        .directive('fileModel', ['$parse', function ($parse) {
            return {
                restrict: 'A',
                link: function (scope, element, attrs) {
                    var model = $parse(attrs.fileModel);
                    var modelSetter = model.assign;

                    element.bind('change', function () {
                        scope.$apply(function () {
                            modelSetter(scope, element[0].files[0]);
                        });
                    });
                }
            };
        }])
        .service('fileUpload', function ($http, AuthService, $q) {
            var service = {};
            function uploadFileToUrl(file) {
                var deferred = $q.defer();
                var fd = new FormData();
                fd.append('file', file);
                $http({
                    method: "POST",
                    url: AuthService.Base + 'api/Upload/UploadFile',
                    data: fd,
                    headers: { 'Content-Type': undefined }
                }).then(function (response) {
                    service.namaFile = response.data.data;
                    deferred.resolve(service.namaFile);
                }, function (error) {
                    // console.log(error);
                    deferred.reject(error);
                })
                return deferred.promise;
            }
            return { upload: uploadFileToUrl};
        })

        // .directive('chooseFile', function () {
        //     return {
        //         link: function (scope, elem, attrs) {
        //             var button = elem.find('img');
        //             var input = angular.element(elem[0].querySelector('input#fileInput'));
        //             button.bind('click', function () {
        //                 input[0].click();
        //                 scope.$apply(function() {
        //                 modelSetter(scope, element[0].files[0]);
        //              });
        //             });
        //             input.bind('change', function (e) {
        //                 scope.$apply(function () {
        //                     var files = e.target.files;
        //                     if (files[0]) {
        //                         var f = files[0];
        //                         var im = window.URL.createObjectURL(f);
        //                         var a = document.getElementsByClassName('photoProfile');
        //                         for (var i = 0; i < a.length; i++) {
        //                             a[i].src = im;
        //                         }
        //                         // scope.model.fileName = f.name;
        //                         var r = new FileReader();
        //                         r.onload = (function (theFile) {

        //                             return function (e) {
        //                                 var img = document.createElement("img");
        //                                 img.src = e.target.result;
        //                                 setTimeout(z => {
        //                                     var canvas = document.createElement("canvas");
        //                                     var ctx = canvas.getContext("2d");
        //                                     if (files[0].type === "application/pdf") {

        //                                     } else {
        //                                         ctx.drawImage(img, 0, 0);
        //                                         var MAX_WIDTH = 400;
        //                                         var MAX_HEIGHT = 300;
        //                                         var width = img.width;
        //                                         var height = img.height;

        //                                         if (width > height) {
        //                                             if (width > MAX_WIDTH) {
        //                                                 height *= MAX_WIDTH / width;
        //                                                 width = MAX_WIDTH;
        //                                             }
        //                                         } else {
        //                                             if (height > MAX_HEIGHT) {
        //                                                 width *= MAX_HEIGHT / height;
        //                                                 height = MAX_HEIGHT;
        //                                             }
        //                                         }
        //                                         canvas.width = width;
        //                                         canvas.height = height;
        //                                         var ctx = canvas.getContext("2d");
        //                                         ctx.drawImage(img, 0, 0, width, height);

        //                                         var dataurl = canvas.toDataURL(f.type);
        //                                         //document.getElementById('output').src = dataurl;

        //                                         var parts = dataurl.split(';base64,');
        //                                         var contentType = parts[0].split(':')[1];
        //                                         var raw = window.atob(parts[1]);
        //                                         //Converting Binary Data to base 64
        //                                         var base64String = window.btoa(raw);
        //                                         //showing file converted to base64
        //                                         // scope.dataGambar = base64String;
        //                                         return 
        //                                     }

        //                                 }, 200)

        //                             };
        //                         })(f);
        //                         r.readAsDataURL(f);
        //                     } else {
        //                         //  scope.model.buktiBayar = null;
        //                     }
        //                 });
        //             });
        //         }
        //     };
        // })
        .factory("AuthService", function ($window) {
            var service = {};
            service.Token = $window.sessionStorage.getItem("Token");
            service.Header = getHeader();
            service.Base = "http://localhost/RestSimak/";
            // service.Base = "https://www.restsimak.stimiksepnop.ac.id/";
            function getHeader() {
                var header = {
                    "content-type": "application/json",
                    "authorization": service.Token
                }
                return header;
            }
            return service;
        })
        .controller('View', function ($scope, $http, $window, SweetAlert, AuthService) {
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
                var Url = AuthService.Base + "api/PenilaianDosen/CekPenilaianDosen?npm=" + $window.sessionStorage.getItem("Username");
                $http({
                    method: "GET",
                    url: Url,
                    headers: {
                        "content-type": "text.plain",
                        "authorization": $window.sessionStorage.getItem("Token")
                    }
                }).then(function (response) {
                    if (response.data !== "Periode Evaluasi Telah Berakhir") {
                        if (response.data !== "Anda Sudah Melakukan Penilaian Dosen") {
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
                });
            }
            var a = JSON.parse($scope.RoleUser);
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
                        { 'href': 'BeritaAcara', 'Text': 'Berita Acara', 'SetStatus': value.Nama }
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
                        {
                            'href': 'UserAkses', 'Text': 'User', 'SetStatus': value.Nama
                        }
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
        .controller("Login", ['$scope', '$http', '$window', function (
            $scope, $http, $window
        ) {
            $scope.DataInput = {};
            $scope.ProsesLogin = function (response) {
                $http({
                    method: "POST",
                    url: "https://www.restsimak.stimiksepnop.ac.id/api/users/login",
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