app.controller('InicioController', function ($scope, utilService, $location, $window) {


    $scope.redirectHome = function () {
        $location.url('/home');
    }


    $scope.redirectCriarActividade = function () {
        $location.path('/CriarActividade').search({ IDSelecionado: 0 });
    }


    $scope.redirectListarActividades = function () {
        $location.url('/ListarActividadesPorData');
    }


    $scope.redirectDetalhesActividades = function () {
        $location.url('/DetalhesActividades');
    }

    $scope.historyBack = function () {
        $window.history.back();
    }
});