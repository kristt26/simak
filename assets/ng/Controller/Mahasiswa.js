(function(angular) {
	'use strict';
	angular
		.module('Mahasiswa', [])
		.controller('MahasiswaController', MahasiswaController)
		.controller('mahasiswajurusanController', mahasiswajurusanController);

	function MahasiswaController($scope, MahasiswaService) {
		$scope.datas = [];
		MahasiswaService.mahasiswaall().then(x=>{
			$scope.datas = x;
		})

	}
	function mahasiswajurusanController($scope, MahasiswaService) {
		$scope.datas = [];
		MahasiswaService.mahasiswaProdi().then((x) => {
			$scope.datas = x;
		});
	}
})(window.angular);
