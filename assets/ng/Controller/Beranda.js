(function (angular) {
    'use strict'
    angular.module('Beranda', ['PengumumanDirectives'])
        .controller('BerandaController', function ($scope, $sce, PengumumanService, AuthService, fileToBase64) {
            $scope.File;
            $scope.dataPengumuman = [];
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
        })
})(window.angular);