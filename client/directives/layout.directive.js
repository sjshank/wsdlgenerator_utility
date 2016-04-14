'use strict';

angular.module('wsdlApp')

//Directive for rendering header and displaying active page
.directive('appHeader', function() {
    return {
        restrict: 'E',
        templateUrl: '../views/header.tpl.html',
        scope: {
            selected: '@'
        },
        link: function(scope, element, attrs) {

        }
    }
})

//Directive for rendering footer section
.directive('appFooter', function() {
    return {
        restrict: 'E',
        templateUrl: '../views/footer.tpl.html',
        link: function(scope, element, attrs) {

        }
    }
});