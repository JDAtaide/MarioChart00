/// <reference path="../Scripts/Pocket.js" />
/// <reference path="../DetalheActividades.html" />
app.controller('ListarActividadesController', function ($scope, $location) {

    $scope.TotalGanho = 0;


    var pocket = new Pocket();
    pocket.restore();
    var actividades = pocket.collection('actividade');


    //actividades.insert([
    //  { actividadeID: 1, ValorCobrado: 100, Percentagem: 40, PMim: 160, PBoss: 240, Obs: 'Teste Pocket #002', DataRegisto: '2018-07-06', ActividadeTipoId: 1 },
    //    { actividadeID: 2, ValorCobrado: 200, Percentagem: 40, PMim: 160, PBoss: 240, Obs: 'Teste Pocket #003', DataRegisto: '2018-07-07', ActividadeTipoId: 1 },
    //    { actividadeID: 3, ValorCobrado: 300, Percentagem: 40, PMim: 160, PBoss: 240, Obs: 'Teste Pocket #004', DataRegisto: '2018-07-08', ActividadeTipoId: 1 },
    //    { actividadeID: 4, ValorCobrado: 400, Percentagem: 40, PMim: 160, PBoss: 240, Obs: 'Teste Pocket #005', DataRegisto: '2018-07-09', ActividadeTipoId: 1 }

    //]);
    //actividades.commit();



    $scope.listaTotal = actividades.find();
    listaLength = actividades.find().length;
    $scope.TotalGanho = CalculateTotal($scope.listaTotal);

    //Buscar Todas as Datas
    $scope.valoresPorDatasList = {};

    var DateListArray = [];
    var dateSorted;

    for (var i = 0; i < listaLength; i++) {
        DateListArray.push($scope.listaTotal[i].DataRegisto);
    };

    //Buscar Datas Unicas
    $scope.uniqueDatas = [];
    $.each(DateListArray, function (i, el) {
        if ($.inArray(el, $scope.uniqueDatas) === -1) $scope.uniqueDatas.push(el);
    });


    //Criar lista Datas-Valores
    $scope.listTotalDiario;
    var valor;
    $scope.arrayDiaValor = [];
    $scope.actividadesDoDia = [];

    for (var i = 0; i < $scope.uniqueDatas.length; i++) {
        valor = 0;
        $scope.actividadesDoDia = [];

        for (var j = 0; j < listaLength; j++) {
            if ($scope.listaTotal[j].DataRegisto == $scope.uniqueDatas[i]) {

                valor = valor + $scope.listaTotal[j].PMim;
                var actividadeDoDia = {
                    actividadeID: $scope.listaTotal[j].actividadeID,
                    actividadeTipoId: $scope.listaTotal[j].ActividadeTipoId,
                    pMim: $scope.listaTotal[j].PMim
                }

                $scope.actividadesDoDia.push(actividadeDoDia);

            }
        }

        var DiaValor = { dataRegisto: $scope.uniqueDatas[i], valor: valor, actividadesDoDia: $scope.actividadesDoDia };
        $scope.arrayDiaValor.push(DiaValor);
    }


    //console.log($scope.arrayDiaValor);


    $scope.openActivity = function (IDSelecionado) {
        //alert(IDSelecionado);
        window.location.href = "/index.html#/CriarActividade?IDSelecionado=" + IDSelecionado;
    };



});


function CalculateTotal(listaTotal) {
    var TotalGanho = 0;
    if (listaTotal.length > 0) {
        for (var i = 0; i < listaTotal.length; i++) {
            TotalGanho = TotalGanho + listaTotal[i].PMim;
        }
    }
    return TotalGanho;
}

