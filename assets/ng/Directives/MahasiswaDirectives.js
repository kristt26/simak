(function(angular) {
	'use strict';
	angular.module('MahasiswaDirectives', []).factory('MahasiswaService', [
		'$q',
		'AuthService',
		'$http',
		function($q, AuthService, $http) {
			var service = {};
			service.data = [];
			function getAction(item) {
				var deferred = $q.defer();
				$http({
					method: 'GET',
					url: AuthService.Base + 'api/Mahasiswa/GetDataMahasiswa?npm=' + item
				}).then(
					function(response) {
						service.data = [];
						service.data = response.data;
						service.instance = true;
						deferred.resolve(service.data);
					},
					function(error) {
						// console.log(error);
						deferred.reject(error);
					}
				);
				return deferred.promise;
			}
			function mahasiswaProdi() {
				var deferred = $q.defer();
				$http({
					method: 'GET',
					url: AuthService.Base + 'api/mahasiswajurusan',
					headers: AuthService.Header
				}).then(
					function(response) {
						service.data = [];
						service.data = response.data;
						service.instance = true;
						deferred.resolve(service.data);
					},
					function(error) {
						// console.log(error);
						deferred.reject(error);
					}
				);
				return deferred.promise;
			}

			function mahasiswaall() {
				var deferred = $q.defer();
				$http({
					method: 'GET',
					url: AuthService.Base + 'api/mahasiswaall',
					headers: AuthService.Header
				}).then(
					function(response) {
						service.data = [];
						service.data = response.data;
						service.instance = true;
						deferred.resolve(service.data);
					},
					function(error) {
						// console.log(error);
						deferred.reject(error);
					}
				);
				return deferred.promise;
			}
			function addmahasiswa(param) {
				var deferred = $q.defer();
				$http({
					method: 'POST',
					url: AuthService.Base + 'api/addmahasiswa',
					data: param,
					headers: AuthService.Header
				}).then(
					function(response) {
						service.data = [];
						service.data = response.data;
						service.instance = true;
						deferred.resolve(service.data);
					},
					function(error) {
						// console.log(error);
						deferred.reject(error);
					}
				);
				return deferred.promise;
			}
			function getadd() {
				var deferred = $q.defer();
				$http({
					method: 'GET',
					url: AuthService.Base + 'api/getadd',
					headers: AuthService.Header
				}).then(
					function(response) {
						deferred.resolve(response.data);
					},
					function(error) {
						// console.log(error);
						deferred.reject(error);
					}
				);
				return deferred.promise;
			}
			return { get: getAction, mahasiswaProdi: mahasiswaProdi, mahasiswaall:mahasiswaall, addmahasiswa:addmahasiswa, getadd:getadd };
		}
	]);
})(window.angular);
