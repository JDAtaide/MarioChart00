/// <reference path="Scripts/Angular/angular-route.min.js" />


var app = angular.module('AppMC', ['ngTouch',"ui.grid", "ngRoute" ])
app.config(function ($routeProvider) {
    $routeProvider
       .when("/home", {
           templateUrl: "Templates/home.html",
           controller: "homeController"
       })
      .when("/CriarActividade", {
          templateUrl: "Templates/CriarActividade.html",
          controller: "CriarActController"
      })
        .when("/ListarActividadesPorData", {
            templateUrl: "Templates/ListarActividadesPorData.html",
            controller: "ListarActividadesController"
        })
     .when("/DetalhesActividades", {
         templateUrl: "Templates/DetalhesActividades.html",
         controller: "DetalhesController"
     })

});

//Para Reverter ordem da Lista de Actividades
//app.filter('reverse', function () {
//    return function (items) {
//        return items.slice().reverse();
//    };
//});