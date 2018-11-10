app.controller('DetalhesController', function ($scope, utilService) {

    var dataSelecionada = utilService.getUrlVars()["dataSelecionada"];

    $scope.ActivityListGrid = {};
    $scope.ActivityListGrid.enableHorizontalScrollbar = 0;
    $scope.ActivityListGrid.enableVerticalScrollbar = 0;
    $scope.TotalGanho = 0;



    if (dataSelecionada == undefined) {
        dataSelecionada = "todas";
    }
    $scope.ActivityList = GetActivityList(dataSelecionada);




    $scope.ActivityList2 = GetActivityList2(dataSelecionada);

    $scope.ActivityListGrid.columnDefs = [{
        name: 'DataRegisto',
        type: 'date',
        cellFilter: 'date:\'dd-MM-yyyy\'',
        sort: { direction: 'asc', priority: 0 }
    }, {
        displayName: 'Duracao - Horas',
        field: 'Duracao',
        enableColumnMenus: false,
        cellTemplate: '<div class="ui-grid-cell-contents">{{grid.appScope.minutesToHours(row.entity.Duracao)}}</div>'
    }, {
        displayName: 'ValorCobrado',
        field: 'ValorCobrado',
        enableColumnMenus: false
    }, {
        displayName: 'Percentagem',
        field: 'Percentagem',
        enableColumnMenus: false
    }, {
        displayName: 'PMim',
        field: 'PMim',
        enableColumnMenus: false
    }, {
        displayName: 'PBoss',
        field: 'PBoss',
        enableColumnMenus: false
    }, {
        displayName: 'Obs',
        field: 'Obs',
        enableColumnMenus: false
    }, {
        displayName: 'TipoDeActividade',
        field: 'TipoDeActividade',
        enableColumnMenus: false
    },
 {
     enableColumnMenu: false,
     name: ' ',
     cellClass: "btnCell", width: 60,
     cellTemplate: '<button type="button" class="btn primary btn-sm small" ng-click="grid.appScope.deleteRow(row)" ><span class="glyphicon glyphicon-remove"></span></button><button type="button" class="btn primary btn-sm small" ng-click="grid.appScope.editRow(row)" ><span class="glyphicon glyphicon-edit"></span></button>'
 }];


    $scope.ActivityListGrid.data = $scope.ActivityList;
    $scope.ActivityListGrid.minRowsToShow = $scope.ActivityList.length;



    $scope.deleteRow = function (row) {

        var index = $scope.ActivityListGrid.data.indexOf(row.entity);
        var idApagar = row.entity.ID;

        swal({
            title: "Tem a certeza que deseja apagar esta linha?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#DD6B55',
            confirmButtonText: 'Sim',
            cancelButtonText: 'Não',
            closeOnConfirm: false,
            closeOnCancel: false

        }).then(function (isConfirm) {
            if (isConfirm.value == true) {

                $.ajax(ws + "JsonDeleteActivity",
                {
                    type: "POST",
                    async: true,
                    data: JSON.stringify({ ID: idApagar }),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (msg) {

                        swal({
                            title: 'Alteração efectuada!',
                            type: 'success',
                            showCancelButton: false,
                            confirmButtonColor: '#DD6B55',
                            confirmButtonText: 'Ok',
                        }).then(function (isConfirm) {
                            if (isConfirm.value == true) {

                                window.location.reload();

                            }
                        });
                    },
                    error: function (jqXHR, textStatus, errorThrown) {

                        swal({
                            title: 'Ocorreu um erro!',
                            type: 'error',
                            showCancelButton: false,
                            confirmButtonColor: '#DD6B55',
                            confirmButtonText: 'Ok',
                        })
                    }
                });

            }
        });

    };

    $scope.editRow = function (row) {

        var IDSelecionado = row.entity.ID;
        alert(IDSelecionado);
        //window.location.href = "CriarActividade.html?IDSelecionado=" + IDSelecionado;
        window.location.href = "/index.html#/CriarActividade?IDSelecionado=" + IDSelecionado;
        ///index.html#/CriarActividade?IDSelecionado=1
    };

    $scope.minutesToHours = function (n) {
        return utilService.minutesToHours(n);
    }

    calculateTotal();

    function calculateTotal() {
        $scope.TotalGanho = 0;
        if ($scope.ActivityList.length > 0) {
            for (var i = 0; i < $scope.ActivityList.length; i++) {
                $scope.TotalGanho = $scope.TotalGanho + $scope.ActivityList[i]. PMim;
            }
        }
    }




    //var actividades = pocket.collection('actividade');
    //$scope.listaTotal2 = actividades.find({ DataRegisto:{ $gt:dataSelecionada }})
    //alert(dataSelecionada);
    //console.log($scope.listaTotal2);









});


function GetActivityList(dataSelecionada) {

    var result;

    $.ajax(ws + "JsonGetActivityList", {
        type: "GET",
        data: { dataSelecionada: "'" + dataSelecionada + "'" },
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


function GetActivityList2(dataSelecionada) {

    var pocket = new Pocket();
    pocket.restore();
    var actividades = pocket.collection('actividade');


    var listaTotal = actividades.find({ DataRegisto: { $eq: dataSelecionada } })
    listaLength = actividades.find().length //2
    console.log(listaTotal);

    return listaTotal
     
}