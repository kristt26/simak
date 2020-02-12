(function (angular) {
  'use strict'
  angular.module('BidikMisiDirectives', [])
    .factory('BidikMisiService', function ($q, AuthService, $http) {
      var service = {};
      service.data = [];
      function getAction() {
        var deferred = $q.defer();
        $http({
          method: "GET",
          url: AuthService.Base + "api/Upload/ReadFile",
          headers: AuthService.Header
        }).then(function (response) {
          service.data = [];
          service.data = response.data;
          service.instance = true;
          deferred.resolve(service.data);
        }, function (error) {
          // console.log(error);
          deferred.reject(error);
        })
        return deferred.promise;
      }
      return { get: getAction };
    })
})(window.angular);




