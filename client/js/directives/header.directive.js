'use strict';

angular.module('wsdlApp')

//Directive for renering header and displaying active page
.directive('appHeader', function() {
    return {
        restrict: 'E',
        templateUrl: 'views/header.tpl.html',
        scope: {
            selected: '@'
        },
        link: function(scope, element, attrs) {

        }
    }
});