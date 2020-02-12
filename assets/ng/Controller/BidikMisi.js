(function (angular) {
    'use strict'
    angular.module('BidikMisi', ['BidikMisiDirectives'])
        .controller('BidikMisiController', function ($scope, fileUpload, BidikMisiService, $sce) {
            $scope.dataGambar= "http://localhost/RestSimak/assets/file/058080157466509.pdf";
            $scope.dataGambar = $sce.trustAsResourceUrl($scope.dataGambar);
            
            // BidikMisiService.get().then(response=>{
            //     $scope.dataGambar = $sce.trustAsResourceUrl(response);
            // })
            $scope.uploadFile = function () {
                var file = $scope.myFile;
                console.log('file is ');
                console.dir(file);
                var uploadUrl = fileUpload.upload(file).then(response => {
                    var a = response;
                }, function (error) {
                    console.log(error);
                });
            };
            
        });
})(window.angular);