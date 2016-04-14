/*
*   Module for configuring angular routing
*/


'use strict';

angular
    .module('app.routes', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/home', {
                templateUrl: '../modules/home/home.html',
                controller: 'homeCtrl',
                controllerAs: 'me'
            })
            .when('/generate', {
                templateUrl: '../modules/generate/generate.html',
                controller: 'generateCtrl',
                controllerAs: 'wsdl'
            })
            .otherwise({
                redirectTo: '/home'
            });
    }]);