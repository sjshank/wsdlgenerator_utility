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
                        requestElements : [
                            {
                                id: 'reqEle1',
                                name: '',
                                elements: [
                                    {input: '', dataType: 'String', id: 'input1'}
                                ]
                            }
                        ],
                        responseElements : [ 
                            {
                                id: 'resEle1',
                                name: '',
                                elements: [
                                    {output: '', dataType: 'String', id: 'output1'}
                                ]
                            }
                        ],
                        requestMessages : [
                            {
                                id: 'reqMsg1',
                                messageName: '',
                                requestElement: {name: '', id: 'reqEle1'}
                            }
                        ],
                        responseMessages : [ 
                            {
                                id: 'resMsg1',
                                name: '',
                                responseElement: {name: '', id: 'resEle1'}
                            }
                        ]
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
					return _wsdl.requestElements.length;
				};
                var _getResponseEleLength = function() {
					return _wsdl.responseElements.length;
				};
                var _resetRequestEle = function() {
					_wsdl.requestElements = [{
                        id: 'reqEle1',
                         name: '',
                            elements: [
                                {input: '', dataType: 'String', id: 'input1'}
                            ]
                    }];
                    return _wsdl;
				};
                var _resetResponseEle = function() {
					_wsdl.responseElements = [{
                        id: 'resEle1',
                         name: '',
                            elements: [
                                {output: '', dataType: 'String', id: 'output'}
                            ]
                    }];
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