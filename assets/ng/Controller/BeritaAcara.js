(function (angular) {
    'use strict'
    angular.module('BeritaAcara', ['BeritaAcaraDirective'])
        .controller('BeritaAcaraController', function ($scope, BaService, $compile, DTOptionsBuilder, DTColumnBuilder, DTColumnDefBuilder) {
            $scope.DatasBa = [];
            BaService.getlaporan().then(response => {
                $scope.DatasBa = response.data;
            }, error => {
                console.log(error);
            });
            var vm = this;
            vm.dtOptions = DTOptionsBuilder.fromSource($scope.DatasBa)
                .withDOM('frtip')
                .withOption('paging', true)
                .withOption('searching', false)
                .withOption('info', false)
                .withPaginationType('full_numbers');
            vm.dtColumns = [
                DTColumnBuilder.newColumn('id').withTitle('ID'),
                DTColumnBuilder.newColumn('firstName').withTitle('First name'),
                DTColumnBuilder.newColumn('lastName').withTitle('Last name')
            ];
            // $scope.vm = this;
            // $scope.vm.message = '';
            // $scope.vm.dtInstance = {};
            // $scope.vm.persons = {};
            // // $scope.vm.dtColumnDefs = [DTColumnDefBuilder.newColumnDef(2).notSortable()];
            // $scope.vm.dtOptions = DTOptionsBuilder.newOptions()
            //     
            // $scope.vm.dtColumns = [
            //     DTColumnBuilder.newColumn('id').withTitle('ID'),
            //     DTColumnBuilder.newColumn('firstName').withTitle('First name'),
            //     DTColumnBuilder.newColumn('lastName').withTitle('Last name')
            // ];
        });
})(window.angular);