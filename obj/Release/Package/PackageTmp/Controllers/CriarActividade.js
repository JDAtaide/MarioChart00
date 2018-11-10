//app.controller('CriarActController', ['$scope', 'utilService', function ($scope, utilService) {
app.controller('CriarActController', function ($scope, utilService) {

    $scope.dataRegisto = new Date($.now());
    $scope.percentagem = 40;
    $scope.valorCobrado = 0;
    var IDSelecionado = parseInt(utilService.getUrlVars()["IDSelecionado"]);
    $scope.msg = "Criar Actividade";

    //alert(IDSelecionado + 10);

    if (IDSelecionado != 0) {
        $scope.msg = "Editar Actividade";
        $scope.ActividadeById = GetActividadeById(IDSelecionado);
        $scope.dataRegisto = new Date($scope.ActividadeById[0].DataRegisto);
        var duracaoEmHoras = utilService.minutesToHours($scope.ActividadeById[0].Duracao);
        $scope.duracao = utilService.minutesToDateFormat($scope.ActividadeById[0].Duracao);
        $scope.percentagem = $scope.ActividadeById[0].Percentagem;
        $scope.valorCobrado = $scope.ActividadeById[0].ValorCobrado;
        $scope.obs = $scope.ActividadeById[0].Obs;
        $scope.newTipoDeActividadeId = $scope.ActividadeById[0].ActividadeTipoId;
    }

    //FILL DROPS
    $scope.ListTipoDeActividade = GetActividadesTipo();

    $scope.pMim = $scope.valorCobrado;

    $scope.SalvarPubCrawl = function () {
        $scope.pMim = $scope.valorCobrado * ($scope.percentagem / 100);
        $scope.pBoss = $scope.valorCobrado - $scope.pMim;
        var dataRegistoString = utilService.DateToString($scope.dataRegisto);
        var duracao = utilService.hoursToMinutes($scope.duracao);


        $scope.Cancelar = function () {
            $window.location.href
        }

        window.swal({

            text: "Deseja guardar a actividade?",
            type: 'question',
            showConfirmButton: true,
            showCancelButton: true,
            allowOutsideClick: false,
            confirmButtonColor: '#DD6B55',
            showLoaderOnConfirm: true,
        }).then(function (isConfirm) {
            if (isConfirm.value == true) {
                PostActividade(IDSelecionado, dataRegistoString, duracao, $scope.valorCobrado, $scope.percentagem, $scope.pMim, $scope.pBoss, $scope.obs, $scope.newTipoDeActividadeId);

            }
        });
    }
});

function GetActividadeById(iDSelecionado) {

    var result;

    $.ajax(ws + "JsonGetActividadeById", {
        type: "GET",
        data: { iDSelecionado: iDSelecionado },
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (data) {
            result = data.d;
            console.log(result);
            //window.location.href = "ListActividades.html";
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


function PostActividade(IDSelecionado, dataRegistoString, duracao, valorCobrado, percentagem, pMim, pBoss, obs, newTipoDeActividadeId) {
    var result;

    $.ajax(ws + "JsonPostActividade", {
        type: "POST",
        data: JSON.stringify({iDSelecionado: IDSelecionado, dataRegisto: dataRegistoString, duracao: duracao, valorCobrado: valorCobrado, percentagem: percentagem, pMim: pMim, pBoss: pBoss, obs: obs, tipoDeActividadeId: newTipoDeActividadeId }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (data) {
            result = data.d;

            swal({
                title: 'Alteração efectuada.',
                type: 'success',
                showConfirmButton: true,
                confirmButtonColor: '#DD6B55',
                confirmButtonText: 'Ok'
            }).then(function (isConfirm) {
                if (isConfirm.value == true) {

                    window.location.reload();

                }
            });
        },
        error: function () {
            swal({
                title: 'Oops...',
                text: 'Ocorreu um erro!',
                type: 'error',
                showConfirmButton: true,
                showCancelButton: false,
                confirmButtonColor: '#DD6B55',
                confirmButtonText: 'Ok'
            });
        }
    });
    return result;
}

function GetActividadesTipo() {

    var result;

    $.ajax(ws + "JsonGetActividadesTipo", {
        type: "GET",
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (data) {
            result = data.d;

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
