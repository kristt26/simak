(function(angular) {
	'use strict';
	angular.module('JadwalDirectives', []).factory('Jadwal', [
		'$q',
		'AuthService',
		'$http',
		function($q, AuthService, $http) {
			var service = {};
			service.instance = false;
			service.data = [];

			function getAction() {
				var deferred = $q.defer();
				$http({
					method: 'GET',
					url: AuthService.Base + 'api/jadwal/jadwalall',
					headers: AuthService.Header
				}).then(
					function(response) {
						service.message = response.data;
						deferred.resolve(service.message);
					},
					function(error) {
						// console.log(error);
						deferred.reject(error);
					}
				);
				return deferred.promise;
			}

			function getJadwalMahasiswa() {
				var deferred = $q.defer();
				$http({
					method: 'GET',
					url: AuthService.Base + 'api/jadwal/jadwalmahasiswa',
					headers: AuthService.Header
				}).then(
					function(response) {
						service.message = response.data;
						deferred.resolve(service.message);
					},
					function(error) {
						deferred.resolve(error);
					}
				);
				return deferred.promise;
			}
			function JadwalKuliah(item) {
				var deferred = $q.defer();
				var Url = AuthService.Base + 'api/jadwal/jadwalKuliah?npm=' + item.npm + '&kelas=' + item.kelas;
				$http({
					method: 'GET',
					url: Url,
					headers: AuthService.Header
				}).then(
					function(response) {
						service.JadwalKuliah = response.data.data;
						deferred.resolve(service.JadwalKuliah);
					},
					function(error) {
						// console.log(error);
						deferred.reject(error);
					}
				);
				return deferred.promise;
			}
			function JadwalDosen() {
				var deferred = $q.defer();
				var Url = AuthService.Base + 'api/jadwal/jadwaldosen';
				$http({
					method: 'GET',
					url: Url,
					headers: AuthService.Header
				}).then(
					function(response) {
						service.JadwalMengajar = response.data.data;
						deferred.resolve(service.JadwalMengajar);
					},
					function(error) {
						// console.log(error);
						deferred.reject(error);
					}
				);
				return deferred.promise;
			}
			function DataDosen(item) {
				var deferred = $q.defer();
				var Url = AuthService.Base + 'api/Pengampuh/GetPengampuh?idpengampu=' + item.idpengampu;
				$http({
					method: 'GET',
					url: Url,
					headers: AuthService.Header
				}).then(
					function(response) {
						service.DataDosen = response.data.data;
						deferred.resolve(service.DataDosen);
					},
					function(error) {
						// console.log(error);
						deferred.reject(error);
					}
				);
				return deferred.promise;
			}
			function DataProdi(item) {
				var deferred = $q.defer();
				var Url = AuthService.Base + 'api/jadwal/jadwalprodi';
				$http({
					method: 'GET',
					url: Url,
					headers: AuthService.Header
				}).then(
					function(response) {
						service.DataDosen = response.data.data;
						deferred.resolve(service.DataDosen);
					},
					function(error) {
						// console.log(error);
						deferred.reject(error);
					}
				);
				return deferred.promise;
			}
			function getMahasiswakelas(item) {
				var deferred = $q.defer();
				var Url = AuthService.Base + 'api/jadwal/mahasiswakelas/' + item.kmk + '/' + item.kelas;
				$http({
					method: 'GET',
					url: Url,
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
			return {
				get: getAction,
				getJadwal: getJadwalMahasiswa,
				getJadwalKuliah: JadwalKuliah,
				getJadwalDosen: JadwalDosen,
				getDosen: DataDosen,
				getProdi: DataProdi,
				getMahasiswakelas: getMahasiswakelas
			};
		}
	]);
})(window.angular);
