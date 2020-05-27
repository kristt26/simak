(function (angular) {
    'use strict'
    var app = angular.module("Ctrl", [
        "angular-loading-bar",
        "Beranda",
        "BaseProfile",
        "Pegawai",
        "Jabatan",
        "Mahasiswa",
        "Jadwal",
        "Prodi",
        "TahunAkademik",
        "GradeNilai",
        "Kurikulum",
        "KemajuanStudi",
        "ApprovedKRS",
        "NilaiMahasiswa",
        "ConversiKHS",
        "Pengumuman",
        "BidikMisi",
        "PengajuanKRS",
        "Profile",
        "Histori",
        "Penelitian",
        "MahasiswaWali",
        "BeritaAcara",
        "EvaluasiPembelajaran",
        "UserAkses",
        "TagihanPembayaran"
    ]);
    app.config(['cfpLoadingBarProvider', function (cfpLoadingBarProvider) {
        cfpLoadingBarProvider.parentSelector = '#loading-bar-container';
        cfpLoadingBarProvider.spinnerTemplate = '<div class="spinnerMain"><div class="spinnerAnimation"></div><span>Loding...</span></div>';
    }]);



    app.filter("groupBy", ["$parse", "$filter", function ($parse, $filter) {
        return function (array, groupByField) {
            var result = [];
            var prev_item = null;
            var groupKey = false;
            var filteredData = $filter('orderBy')(array, groupByField);
            for (var i = 0; i < filteredData.length; i++) {
                groupKey = false;
                if (prev_item !== null) {
                    if (prev_item[groupByField] !== filteredData[i][groupByField]) {
                        groupKey = true;
                    }
                } else {
                    groupKey = true;
                }
                if (groupKey) {
                    filteredData[i]['group_by_key'] = true;
                } else {
                    filteredData[i]['group_by_key'] = false;
                }
                result.push(filteredData[i]);
                prev_item = filteredData[i];
            }
            return result;
        }
    }]);
})(window.angular);

