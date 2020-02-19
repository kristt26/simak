(function(angular){
    'use strict'
    angular.module('serviceFile', [])
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
        function uploadFileToUrl(file, set) {
            var deferred = $q.defer();
            var fd = new FormData();
            fd.append('file', file);
            $http({
                method: "POST",
                url: AuthService.Base + 'api/Upload/UploadFile?folder='+set,
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
    .service('fileDelete', function ($http, AuthService, $q) {
        var service = {};
        function deleteFileToUrl(item, set) {
            var deferred = $q.defer();
            $http({
                method: "DELETE",
                url: AuthService.Base + 'api/Upload/deleteFile?folder='+set+'&berkas='+item,
                headers: AuthService.headers
            }).then(function (response) {
                service = response;
                deferred.resolve(service);
            }, function (error) {
                // console.log(error);
                deferred.reject(error);
            })
            return deferred.promise;
        }
        return { delete: deleteFileToUrl};
    })
    .service('fileToBase64', function ($http, AuthService) {
        function convertToBase64(url, callback) {
            var img = new Image();
            img.crossOrigin = 'Anonymous';
            img.onload = function() {
                var canvas = document.createElement('CANVAS');
                var ctx = canvas.getContext('2d');
                var dataURL;
                canvas.height = this.height;
                canvas.width = this.width;
                ctx.drawImage(this, 0, 0);
                dataURL = canvas.toDataURL();
                callback(dataURL);
                canvas = null;
              };
              img.src = url;
        }
        return { convert: convertToBase64};
    })
})(window.angular);