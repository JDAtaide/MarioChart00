/// <reference path="../DetalheActividades.html" />
app.controller('ListarActividadesController', function ($scope, $location) {

    $scope.searchMode = false;
    $scope.AllDatesList = GetAllDates();

    $scope.TotalGanho = 0;
    $scope.searchByDate = true;

    $scope.ListByDateGrid = {};
    $scope.ListByDate = {};
    $scope.ListByDateGrid.enableHorizontalScrollbar = 0;
    $scope.ListByDateGrid.enableVerticalScrollbar = 0;



    $scope.ShowSearchByDate = function () {
        $("#Button1").attr('class', 'btn btn-primary');
        $("#Button2").attr('class', 'btn btn-dark');

        $scope.searchByDate = true;
        $scope.searchMode = false;
    }

    $scope.getListByDate = function () {


        var valorSelecionado = $("#slDatasAConsultar>option:selected").html();
        $scope.ListByDate = GetListByDate(valorSelecionado);
        $scope.searchMode = true;
        $scope.ListByDateGrid.data = $scope.ListByDate;
        $scope.ListByDateGrid.minRowsToShow = $scope.ListByDate.length;

        $scope.ListByDateGrid.columnDefs = [{
            name: 'Data',
            type: 'date',
            cellFilter: 'date:\'dd-MM-yyyy\'',
        }, {
            name: 'ValorPCrawl',
            enableColumnMenus: false
        }, {

            name: 'ValorTukTuks',
            enableColumnMenus: false
        }, {
            displayName: 'Total',
            field: 'ValorTotal',
            enableColumnMenus: false,
        }, {
            enableColumnMenu: false,
            name: ' ',
            cellClass: "btnCell", width: 40,
            cellTemplate: '<button type="button" class="btn primary btn-sm" style="width: 60px" ng-model="AUM" ng-click="grid.appScope.goToDetails(row)"><span class="glyphicon glyphicon-edit"></span></button>'
        }];

        calculateTotal();
    }





    $scope.getAllListByDate = function () {
       


        $("#Button2").attr('class', 'btn btn-primary');
        $("#Button1").attr('class', 'btn btn-dark');

        $scope.searchByDate = false;
        $scope.searchMode = false;
        $scope.ListByDate = GetAllListByDate();
       

        $scope.ListByDateGrid = {
          
            //minRowsToShow: $scope.ListByDate.length,
            data: $scope.ListByDate,
            enableSorting: true,
        };

        $scope.ListByDateGrid.columnDefs = [{
            displayName: 'Data',
            field: 'Data',
            type: 'date',
            cellFilter: 'date:\'dd-MM\'',
            sort: { direction: 'asc', priority: 0 }
        }, {
            displayName: 'P.Crawl',
            field: 'ValorPCrawl',
            enableColumnMenus: false,
            cellFilter: 'currency'
        }, {
            displayName: 'Tuk Tuks',
            field: 'ValorTukTuks',
            enableColumnMenus: false,
            cellFilter: ' currency : "€"'
        }, {
            displayName: 'Total',
            field: 'ValorTotal',
            enableColumnMenus: false,
            cellFilter: ' currency : "€"',

        }, {
            enableColumnMenu: false,
            name: ' ',
            cellClass: "btnCell", width: 40,
            cellTemplate: '<button type="button" class="btn small" ng-click="grid.appScope.goToDetails(row)"><span class="glyphicon glyphicon-edit"></span></button>'
        }];
        $scope.searchMode = true;
        calculateTotal();

      
        $scope.ListByDateGrid.onRegisterApi = function (gridApi) {
            $scope.ListByDateGrid.minRowsToShow = $scope.ListByDate.length;
          
        };
        gridApi.core.notifyDataChange(uiGridConstants.dataChange.ALL)
    };




    $scope.goToDetails = function (row) {

        var dataSelecionada = row.entity.Data;
        $location.path('/DetalhesActividades').search({ dataSelecionada: dataSelecionada });
    };


    function calculateTotal() {
        $scope.TotalGanho = 0;
        if ($scope.ListByDate.length > 0) {
            for (var i = 0; i < $scope.ListByDate.length; i++) {
                $scope.TotalGanho = $scope.TotalGanho + $scope.ListByDate[i].ValorTotal;
            }
        }
    }




});

function GetAllDates() {

    var result;

    $.ajax(ws + "JsonGetAllDates", {
        type: "GET",
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (data) {
            result = data.d;
            console.log(result);

        },
        error: function () {

            swal({
                title: 'Ocorreu um erro!',
                type: 'error',
                showCancelButton: false,
                confirmButtonColor: '#DD6B55',
                confirmButtonText: 'Ok',
            })
        }
    });

    return result;

}

function GetListByDate(dataEscolhida) {

    var result;

    $.ajax(ws + "JsonGetListByDate", {
        type: "GET",
        data: { 'dataEscolhida': "'" + dataEscolhida + "'" },
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (data) {
            result = data.d;
            //console.log(result);
        },
        error: function () {

            swal({
                title: 'Ocorreu um erro!',
                type: 'error',
                showCancelButton: false,
                confirmButtonColor: '#DD6B55',
                confirmButtonText: 'Ok',
            })
        }
    });

    return result;
    //alert(dataEscolhida);
}



function GetAllListByDate() {

    var result;

    $.ajax(ws + "JsonGetAllListByDate", {
        type: "GET",
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (data) {
            result = data.d;
            console.log(result);

        },
        error: function () {

            swal({
                title: 'Ocorreu um erro!',
                type: 'error',
                showCancelButton: false,
                confirmButtonColor: '#DD6B55',
                confirmButtonText: 'Ok',
            })
        }
    });

    return result;

}



