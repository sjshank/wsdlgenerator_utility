/*
*   Service responsible for persisting customer data
*
*/

'use strict';
angular.module('wsdlApp')

.factory('wsdlDataService', 
			function() {
				 var _init = {
                    serviceName: '',
                    targetNamespace: 'http://service.lfg.com/',
                        requestElement : {
                            name: '',
                            elements: [
                                {input: '', dataType: 'String', id: 'input1'}
                            ]
                        },
                        responseElement : {
                            name: '',
                            elements: [
                                {output: '', dataType: 'String', id: 'output'}
                            ]
                        }
                };
                
                var _wsdl = {};
                var _reset = function() {  
                    _wsdl = angular.copy(_init);
                    return _wsdl;
                };
				var _setWsdlObject = function(obj) {
					_wsdl = obj;
				};
				var _getWsdlObject = function() {
					return _wsdl;
				};
                var _getRequestEleLength = function() {
					return _wsdl.requestElement.elements.length;
				};
                var _getResponseEleLength = function() {
					return _wsdl.responseElement.elements.length;
				};
                var _resetRequestEle = function() {
					_wsdl.requestElement = {
                         name: '',
                            elements: [
                                {input: '', dataType: 'String', id: 'input1'}
                            ]
                    };
                    return _wsdl;
				};
                var _resetResponseEle = function() {
					_wsdl.responseElement = {
                         name: '',
                            elements: [
                                {input: '', dataType: 'String', id: 'output'}
                            ]
                    };
                    return _wsdl;
				};
                
				return {
                    'getWsdlRequest': _getWsdlObject,
                    'setWsdlRequest': _setWsdlObject,
                    'getRequestEleLength': _getRequestEleLength,
                    'getResponseEleLength': _getResponseEleLength,
                    'resetReqEle': _resetRequestEle,
                    'resetResEle': _resetResponseEle,
                    'reset': _reset
                };
});