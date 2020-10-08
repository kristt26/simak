(function (angular) {
    'use strict'
    angular.module('Inbox', [])
        .controller('InboxController', function ($scope, $sce, $http, AuthService) {
            $scope.datas=[];
            $http({
                method: 'GET',
                url: 'https://surat.stimiksepnop.ac.id/admin/surat/suratmahasiswa/' + AuthService.dataUser.Username
            }).then(response=>{
                $scope.datas = response.data;
            })

            $scope.show=(item)=>{
                $scope.pdfName = 'PDFTron SDK';
                $scope.pdfUrl = item.berkas;
                $scope.pdfPassword = 'test';
                $scope.scroll = 0;
                $scope.loading = 'loading';
                $("#show").modal("show");
            }
            
            // $scope.pdfName = 'PDFTron SDK';
            // $scope.pdfUrl = 'pdf/pdftron-sdk.pdf';
            // $scope.pdfPassword = 'test';
            // $scope.scroll = 0;
            // $scope.loading = 'loading';
          
            $scope.getNavStyle = function(scroll) {
              if (scroll > 100) return 'pdf-controls fixed';
              else return 'pdf-controls';
            };
          
            $scope.onError = function(error) {
              console.log(error);
            };
          
            $scope.onLoad = function() {
              $scope.loading = '';
            };
          
            $scope.onProgress = function(progressData) {
              // console.log(progressData);
            };
          
            $scope.onPassword = function(updatePasswordFn, passwordResponse) {
              if (passwordResponse === PDFJS.PasswordResponses.NEED_PASSWORD) {
                updatePasswordFn($scope.pdfPassword);
              } else if (
                passwordResponse === PDFJS.PasswordResponses.INCORRECT_PASSWORD
              ) {
                console.log('Incorrect password');
              }
            };
          
            $scope.openLocalFile = function() {
              jQuery('#file').trigger('click');
            };
          
            $scope.onFileSelected = function(e) {
              if (!e.files.length) return;
          
              var file = e.files[0];
              var reader = new FileReader();
              reader.onload = function(res) {
                $scope.$apply(function() {
                  $scope.pdfUrl = res.target.result;
                });
              };
          
              reader.readAsDataURL(file);
            };











        });
})(window.angular);