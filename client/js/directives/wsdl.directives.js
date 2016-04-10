'use strict';

angular.module('wsdlApp')

//Directive for renering header and displaying active page
.directive('ngbuttonTemplate', function() {
    return {
        restrict: 'E',
        templateUrl: 'views/templates/buttons.tpl.html',
        scope: {
            me: '=',
            addRequestElement: '&',
            addResponseElement: '&',
            addRequestMessage: '&',
            addResponseMessage: '&'
        },
        link: function(scope, element, attrs) {

        }
    }
})

//Directive for renering header and displaying active page
.directive('requestEleTpl', function() {
    return {
        restrict: 'E',
        templateUrl: 'views/templates/requestEle.tpl.html',
        scope: {
            me: '=',
            addElement: '&',
            removeElement: '&'
        },
        link: function(scope, element, attrs) {

        }
    }
});