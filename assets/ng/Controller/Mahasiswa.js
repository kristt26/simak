(function(angular) {
	'use strict';
	angular
		.module('Mahasiswa', [])
		.controller('MahasiswaController', MahasiswaController)
		.controller('mahasiswajurusanController', mahasiswajurusanController);

	function MahasiswaController($scope) {}
	function mahasiswajurusanController($scope, MahasiswaService) {
		$scope.datas = [];
		MahasiswaService.mahasiswaProdi().then((x) => {
			$scope.datas = x;
		});
	}
})(window.angular);
