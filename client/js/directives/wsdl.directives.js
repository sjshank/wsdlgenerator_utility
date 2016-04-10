'use strict';

angular.module('wsdlApp')

//Directive for renering header and displaying active page
.directive('ngbuttonTemplate', function() {
    return {
        restrict: 'E',
        replace: true,
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
        replace: true,
        templateUrl: 'views/templates/requestEle.tpl.html',
        scope: {
            me: '=',
            addElement: '&',
            removeElement: '&',
            add: '&'
        },
        link: function(scope, element, attrs) {
            scope.REQ_ELE_NAME_ERR = scope.$root.REQ_ELE_NAME_ERR;
            scope.ELEMENT_NAME_ERR = scope.$root.ELEMENT_NAME_ERR;
        }
    }
})

//Directive for renering header and displaying active page
.directive('responseEleTpl', function() {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'views/templates/responseEle.tpl.html',
        scope: {
            me: '=',
            add: '&'
        },
        link: function(scope, element, attrs) {
            scope.RES_ELE_NAME_ERR = scope.$root.RES_ELE_NAME_ERR;
            scope.ELEMENT_NAME_ERR = scope.$root.ELEMENT_NAME_ERR;
        }
    }
});