(function(angular) {
	'use strict';
	angular
		.module('Mahasiswa', [])
		.controller('MahasiswaController', MahasiswaController)
		.controller('mahasiswajurusanController', mahasiswajurusanController)
		.controller('addMahasiswaController', addMahasiswaController);

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
	function addMahasiswaController($scope, MahasiswaService, SweetAlert, TahunAkademikService) {
		$scope.datas = [];
		$scope.model = {};
		$scope.prodis = {};
		$scope.tahun = "";
		MahasiswaService.getadd().then((x) => {
			TahunAkademikService.get().then(tahun=>{
				$scope.tahun = tahun.thakademik.substring(0, 4);
				console.log($scope.tahun);
			})
			$scope.datas = x;
		});

		$scope.save = ()=>{
			MahasiswaService.addmahasiswa($scope.model).then(res=>{
				SweetAlert.swal("Approved!", "Proses berhasil", "success");
			})
		}
	}
})(window.angular);
