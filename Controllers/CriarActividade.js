//app.controller('CriarActController', ['$scope', 'utilService', function ($scope, utilService) {
app.controller('CriarActController', function ($scope, utilService) {


    $scope.dataRegisto = new Date($.now());
    $scope.percentagem = 40;
    $scope.valorCobrado = 0;
    $scope.iDSelecionado = parseInt(utilService.getUrlVars()["IDSelecionado"]);
    $scope.msg = "Criar Actividade";

    //alert(IDSelecionado + 10);

    if ($scope.iDSelecionado != 0) {
        $scope.editing = false;
        $scope.ActividadeSelecionadaById = GetActividadeById2($scope.iDSelecionado);
        $scope.msg = "Actividade: " + $scope.iDSelecionado;
        //$scope.ActividadeById = GetActividadeById(IDSelecionado);
        $scope.dataRegisto = new Date($scope.ActividadeSelecionadaById.DataRegisto);
        $scope.horas = $scope.ActividadeSelecionadaById.horas;
        $scope.minutos = $scope.ActividadeSelecionadaById.minutos;
        $scope.percentagem = $scope.ActividadeSelecionadaById.Percentagem;
        $scope.valorCobrado = $scope.ActividadeSelecionadaById.ValorCobrado;
        $scope.obs = $scope.ActividadeSelecionadaById.Obs;
        //$scope.newTipoDeActividadeId = $scope.ActividadeSelecionadaById[0].ActividadeTipoId;
    }

    //FILL DROPS

    //$scope.ListTipoDeActividade = GetActividadesTipo();

    $scope.pMim = $scope.valorCobrado;




    $scope.Editar = function () {

        $scope.editing = true;

    }


    $scope.Cancelar = function () {
        window.location.reload();
    }




    $scope.SalvarPubCrawl = function () {
        $scope.pMim = $scope.valorCobrado * ($scope.percentagem / 100);
        $scope.pBoss = $scope.valorCobrado - $scope.pMim;
        var dataRegistoString = utilService.DateToString($scope.dataRegisto);
        //var duracao = utilService.hoursToMinutes($scope.duracao);



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

                var count = localStorage.getItem('nextId') == null ? 1 : localStorage.getItem('nextId');
                localStorage.nextId = parseInt(count) + 1;

                //$scope.iDSelecionado == 0 ? parseInt(count) : $scope.iDSelecionado;


                if ($scope.iDSelecionado == 0) {

                    $scope.iDSelecionado = count;
                    //alert($scope.iDSelecionado);
                }



                //var actividade = {
                //    ID: $scope.iDSelecionado,
                //    dataRegistoString: dataRegistoString,
                //    //duracao: duracao,
                //    horas: $scope.horas,
                //    minutos: $scope.minutos,
                //    valorCobrado: $scope.valorCobrado,
                //    percentagem: $scope.percentagem,
                //    pMim: $scope.pMim,
                //    pBoss: $scope.pBoss,
                //    obs: $scope.obs,
                //    newTipoDeActividadeId: 1
                //};



                var pocket = new Pocket();
                pocket.restore();
                var actividades = pocket.collection('actividade');

                //var newId = actividades.find().length;
                //alert(newId);
                actividades.insert([
                    {
                        actividadeID: $scope.iDSelecionado,
                        ValorCobrado: $scope.valorCobrado,
                        Percentagem: $scope.percentagem,
                        PMim: $scope.pMim,
                        PBoss: $scope.pBoss,
                        Obs: $scope.obs,
                        DataRegisto: dataRegistoString,
                        horas: $scope.horas,
                        minutos: $scope.minutos,
                        //ActividadeTipoId: $scope.newTipoDeActividadeId
                        ActividadeTipoId: 1
                    },
                ]);
                actividades.commit();

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





            }
        });
    }
});



function GetActividadeById2(iDSelecionado) {

    var pocket = new Pocket();
    pocket.restore();
    var actividades = pocket.collection('actividade');


    var actividadeSelecionada = actividades.findOne({ actividadeID: { $eq: iDSelecionado } })
    //listaLength = actividades.find().length //2
    console.log(actividadeSelecionada);

    return actividadeSelecionada;

}
