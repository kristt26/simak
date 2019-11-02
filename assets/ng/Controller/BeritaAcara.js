(function(angular){
    'use strict'
    angular.module('BeritaAcara', ['BeritaAcaraDirective'])
    .controller('BeritaAcaraController', function($scope, BaService, $compile, DTOptionsBuilder, DTColumnBuilder, DTColumnDefBuilder){
        $scope.DatasBa = [];
        BaService.getlaporan().then(response => {
            $scope.DatasBa = response;
        }, error =>{
            console.log(error);
        });
        $scope.vm = this;
        $scope.vm.message = '';
        $scope.vm.dtInstance = {};
        $scope.vm.persons = {};
        // $scope.vm.dtColumnDefs = [DTColumnDefBuilder.newColumnDef(2).notSortable()];
        $scope.vm.dtOptions = DTOptionsBuilder.newOptions()
            .withOption('paging', true)
            .withOption('searching', false)
            .withOption('info', false)
            .withPaginationType('full_numbers')
        // $scope.vm.dtColumns = [
        //     DTColumnBuilder.newColumn('id').withTitle('ID'),
        //     DTColumnBuilder.newColumn('firstName').withTitle('First name'),
        //     DTColumnBuilder.newColumn('lastName').withTitle('Last name'),
        //     DTColumnBuilder.newColumn(null).withTitle('Actions').notSortable()
        //         .renderWith(actionsHtml)
        // ];
    });
})(window.angular);