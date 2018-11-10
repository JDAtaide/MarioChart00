app.directive('listaActividades', function () {
    return {
        restrict: 'E',
        scope: {
            info: '='
        },
        templateUrl: 'InfoActividade.html'
    };

});