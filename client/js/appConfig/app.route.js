/*
*   Module for configuring angular routing
*/


'use strict';

angular
    .module('app.routes', ['ngRoute'])
    
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/home', {
                templateUrl:'views/home.html',
                controller:'homeCtrl',
                controllerAs:'me'
            })
            .when('/generate', {
                templateUrl:'views/generator.html',
                controller:'generateCtrl',
                controllerAs:'me'
            })
            .otherwise({
                redirectTo:'/home'
            });
   }]);