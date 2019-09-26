(function (angular) {
    'use strict'
    angular.module('HistoriDirective', [])
        .factory('HistoriService', function ($q, AuthService, $http) {
            var service = {};
            service.instance = false;
            service.data = [];

            return { get: getAction, post: postAction, put: putAction };
        })
})(window.angular);