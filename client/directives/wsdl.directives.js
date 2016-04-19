'use strict';

angular.module('wsdlApp')

//Directive for renering header and displaying active page
.directive('ngbuttonTemplate', function() {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: '../modules/generate/buttons.tpl.html',
        scope: {
            wsdl: '=',
            addRequestElement: '&',
            addResponseElement: '&',
            addRequestMessage: '&',
            addResponseMessage: '&',
            addOperation: '&',
            addSoapAddress: '&'
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
        templateUrl: '../modules/requestElement/requestEle.tpl.html',
        scope: {
            wsdl: '=',
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
        templateUrl: '../modules/responseElement/responseEle.tpl.html',
        scope: {
            wsdl: '=',
            addElement: '&',
            removeElement: '&',
            add: '&'
        },
        link: function(scope, element, attrs) {
            scope.RES_ELE_NAME_ERR = scope.$root.RES_ELE_NAME_ERR;
            scope.ELEMENT_NAME_ERR = scope.$root.ELEMENT_NAME_ERR;
        }
    }
})

//Directive for renering header and displaying active page
.directive('requestMsgTpl', function() {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: '../modules/requestMessage/requestMsg.tpl.html',
        scope: {
            wsdl: '=',
            add: '&'
        },
        link: function(scope, element, attrs) {
            scope.REQ_MSG_NAME_ERR = scope.$root.REQ_MSG_NAME_ERR;
        }
    }
})

//Directive for renering header and displaying active page
.directive('responseMsgTpl', function() {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: '../modules/responseMessage/responseMsg.tpl.html',
        scope: {
            wsdl: '=',
            add: '&'
        },
        link: function(scope, element, attrs) {
            scope.RES_MSG_NAME_ERR = scope.$root.RES_MSG_NAME_ERR;
        }
    }
})

//Directive for renering header and displaying active page
.directive('operationTpl', function() {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: '../modules/operation/addOperation.tpl.html',
        scope: {
            wsdl: '=',
            add: '&'
        },
        link: function(scope, element, attrs) {
            scope.METHOD_NAME_ERR = scope.$root.METHOD_NAME_ERR;
        }
    }
})

//Directive for renering header and displaying active page
.directive('soapAddrTpl', function() {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: '../modules/soapAddress/soapAddr.tpl.html',
        scope: {
            wsdl: '=',
            add: '&'
        },
        link: function(scope, element, attrs) {
            scope.LOCATION_ERR = scope.$root.LOCATION_ERR;
            scope.PORT_ERR = scope.$root.PORT_ERR;
            scope.CONTEXT_ROOT_ERR = scope.$root.CONTEXT_ROOT_ERR;
        }
    }
});

