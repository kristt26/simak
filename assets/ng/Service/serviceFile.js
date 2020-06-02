(function (angular) {
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
                    url: AuthService.Base + 'api/Upload/UploadFile?folder=' + set,
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

            function uploadTrxBayar(file) {
                var deferred = $q.defer();
                var fd = new FormData();
                fd.append('file', file);
                $http({
                    method: "POST",
                    url: 'https://keuangan.stimiksepnop.ac.id/api/datas/create/UploadTransaksiBayar.php',
                    data: fd,
                    headers: { 'Content-Type': undefined }
                }).then(function (response) {
                    service.namaFile = response.data.Berkas;
                    deferred.resolve(service.namaFile);
                }, function (error) {
                    // console.log(error);
                    deferred.reject(error);
                })
                return deferred.promise;
            }
            return { upload: uploadFileToUrl, uploadbayar: uploadTrxBayar };
        })
        .service('fileDelete', function ($http, AuthService, $q) {
            var service = {};
            function deleteFileToUrl(item, set) {
                var deferred = $q.defer();
                $http({
                    method: "DELETE",
                    url: AuthService.Base + 'api/Upload/deleteFile?folder=' + set + '&berkas=' + item,
                    headers: AuthService.Header
                }).then(function (response) {
                    service = response;
                    deferred.resolve(service);
                }, function (error) {
                    // console.log(error);
                    deferred.reject(error);
                })
                return deferred.promise;
            }
            return { delete: deleteFileToUrl };
        })
        .service('updateDataGambar', function ($http, AuthService, $q) {
            var service = {};
            function updateDataFile(item) {
                var deferred = $q.defer();
                $http({
                    method: "PUT",
                    url: AuthService.Base + 'api/Upload/updateData',
                    data: item,
                    headers: AuthService.Header
                }).then(function (response) {
                    service = response;
                    deferred.resolve(service);
                }, function (error) {
                    // console.log(error);
                    deferred.reject(error);
                })
                return deferred.promise;
            }
            return { updateData: updateDataFile };
        })
        .factory('fileToBase64', function ($http, AuthService) {
            function convertToBase64(url, callback) {
                var img = new Image();
                img.crossOrigin = 'Anonymous';
                img.addEventListener("load", imageReceived, false);
                img.onload = function () {
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
            return { convert: convertToBase64 };
        })

        .factory('covertFileGambar', function () {
            function tampilGambar(itemFile) {
                var img = document.createElement("img");
                // img.src = e.target.result;

                img.src = itemFile;
                setTimeout(z => {
                    var canvas = document.createElement("canvas");
                    var ctx = canvas.getContext("2d");

                    ctx.drawImage(img, 0, 0);
                    var MAX_WIDTH = 400;
                    var MAX_HEIGHT = 300;
                    var width = img.width;
                    var height = img.height;

                    if (width > height) {
                        if (width > MAX_WIDTH) {
                            height *= MAX_WIDTH / width;
                            width = MAX_WIDTH;
                        }
                    } else {
                        if (height > MAX_HEIGHT) {
                            width *= MAX_HEIGHT / height;
                            height = MAX_HEIGHT;
                        }
                    }
                    canvas.width = width;
                    canvas.height = height;
                    var ctx = canvas.getContext("2d");

                    var typeOf = itemFile.split(';base64,');
                    var contentType = typeOf[0].split(':')[1];
                    ctx.drawImage(img, 0, 0, width, height);

                    var dataurl = canvas.toDataURL(contentType);
                    //document.getElementById('output').src = dataurl;

                    var parts = dataurl.split(';base64,');
                    // var contentType = parts[0].split(':')[1];
                    var raw = window.atob(parts[1]);
                    //Converting Binary Data to base 64
                    var base64String = window.btoa(raw);
                    //showing file converted to base64
                    // scope.dataGambar = base64String;
                    return
                }, 200)
            }
            return { tampil: tampilGambar };
        })

        .directive('chooseFile', function (fileUpload, updateDataGambar) {
            return {
                link: function (scope, elem, attrs) {
                    var button = elem.find('img');
                    var input = angular.element(elem[0].querySelector('input#fileInput'));
                    button.bind('click', function () {
                        input[0].click();
                        scope.$apply(function () {
                            // modelSetter(scope, element[0].files[0]);
                        });
                    });
                    input.bind('change', function (e) {
                        var files = e.target.files;
                        var set = "photo"
                        scope.$apply(function () {
                            // files = e.target.files[0];
                            if (files[0]) {
                                var f = files[0];
                                var im = window.URL.createObjectURL(f);
                                var a = document.getElementsByClassName('photoProfile');
                                for (var i = 0; i < a.length; i++) {
                                    a[i].src = im;
                                }
                                // scope.model.fileName = f.name;
                                var r = new FileReader();
                                r.onload = (function (theFile) {

                                    return function (e) {
                                        var img = document.createElement("img");
                                        img.src = e.target.result;
                                        setTimeout(z => {
                                            var canvas = document.createElement("canvas");
                                            var ctx = canvas.getContext("2d");
                                            if (files[0].type === "application/pdf") {

                                            } else {
                                                ctx.drawImage(img, 0, 0);
                                                var MAX_WIDTH = 400;
                                                var MAX_HEIGHT = 300;
                                                var width = img.width;
                                                var height = img.height;

                                                if (width > height) {
                                                    if (width > MAX_WIDTH) {
                                                        height *= MAX_WIDTH / width;
                                                        width = MAX_WIDTH;
                                                    }
                                                } else {
                                                    if (height > MAX_HEIGHT) {
                                                        width *= MAX_HEIGHT / height;
                                                        height = MAX_HEIGHT;
                                                    }
                                                }
                                                canvas.width = width;
                                                canvas.height = height;
                                                var ctx = canvas.getContext("2d");
                                                ctx.drawImage(img, 0, 0, width, height);

                                                var dataurl = canvas.toDataURL(f.type);
                                                //document.getElementById('output').src = dataurl;

                                                var parts = dataurl.split(';base64,');
                                                var contentType = parts[0].split(':')[1];
                                                var raw = window.atob(parts[1]);
                                                //Converting Binary Data to base 64
                                                var base64String = window.btoa(raw);
                                                //showing file converted to base64
                                                // scope.dataGambar = base64String;
                                                return
                                            }

                                        }, 200)

                                    };
                                })(f);
                                r.readAsDataURL(f);
                            } else {
                                //  scope.model.buktiBayar = null;
                            }
                        });
                        fileUpload.upload(files[0], set).then(response => {
                            var DataFile = {};
                            DataFile.photo = response;
                            updateDataGambar.updateData(DataFile).then(response => {

                            })
                        })


                    });
                }
            };
        })
        .directive('datepicker', function () {
            return {
                restrict: 'A',
                require: 'ngModel',
                compile: function () {
                    return {
                        pre: function (scope, element, attrs, ngModelCtrl) {
                            var format, dateObj;
                            format = (!attrs.dpFormat) ? 'yyyy-m-d' : attrs.dpFormat;
                            if (!attrs.initDate && !attrs.dpFormat) {
                                // If there is no initDate attribute than we will get todays date as the default
                                dateObj = new Date();
                                scope[attrs.ngModel] = dateObj.getDate() + '/' + (dateObj.getMonth() + 1) + '/' + dateObj.getFullYear();
                            } else if (!attrs.initDate) {
                                // Otherwise set as the init date
                                scope[attrs.ngModel] = attrs.initDate;
                            } else {
                                // I could put some complex logic that changes the order of the date string I
                                // create from the dateObj based on the format, but I'll leave that for now
                                // Or I could switch case and limit the types of formats...
                            }
                            // Initialize the date-picker
                            $(element).datepicker({
                                format: format,
                            }).on('changeDate', function (ev) {
                                // To me this looks cleaner than adding $apply(); after everything.
                                scope.$apply(function () {
                                    ngModelCtrl.$setViewValue(ev.format(format));
                                });
                            });
                        }
                    }
                }
            }
        })
        ;
})(window.angular);