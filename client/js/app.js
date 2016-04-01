/*
*	app.js for initializing angular module container.
*   Defining routes, value and rootscope.
*/

'use strict';

angular.module('wsdlApp', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/home', {
                templateUrl:'views/home.html'
            })
            .when('/generate', {
                templateUrl:'views/generator.html',
                controller:'generateCtrl',
                controllerAs:'me'
            })
            .otherwise({
                redirectTo:'/home'
            });
    }])
    
.value('WsdlUrl', 'api/createWsdl.xml')
.constant('appConstants', {
        SERVICE_ERROR : "Service is temporarily unavailable. Please try after sometime.",
})
.run(['$rootScope', function(rootScope){
    rootScope.subHeading = "A MEAN Stack based utility to generate draft version of SOAP-WSDL.";
}]);