'use strict';

angular.module('wsdlApp')

    .controller('generateCtrl', ['$scope', '$rootScope', '$log', 'wsdlAPI', 'appConstants', 'ngDialog',
        'wsdlDataService', '$controller', 'FileSaver', 'Blob', '$window',
        function($scope, $rootScope, $log, wsdlAPI, appConstants, ngDialog,
            wsdlDataService, $controller, FileSaver, Blob, $window) {

            var wsdl = this;
            wsdl.hasError = false;
            wsdl.dataTypes = appConstants.DATA_TYPES;
            wsdl.disableReqEle = false;
            wsdl.disableResEle = false;
            wsdl.disableReqMsg = false;
            wsdl.disableResMsg = false;
            wsdl.disableSoapAddr = false;
            wsdl.disableOperatn = false;
            wsdl.disableGenerate = false;
            wsdl.showDialog = false;
            wsdl.showReqEle = false;
            wsdl.showResEle = false;
            wsdl.showReqMsg = false;
            wsdl.showResMsg = false;
            wsdl.showOperatn = false;
            wsdl.showSoapAddr = false;

            var options = {
                scope: $scope
            }

            //Initialize wsdl request object
            try {
                wsdlDataService.reset();
                wsdl.wsdlObject = wsdlDataService.getWsdlRequest();
            } catch (err) {
                $log.error('Error while initializing WSDL Object ', err);
            }


            //watch function for targetNamespace.
            $scope.$watch('wsdl.wsdlObject.targetNamespace', function(newValue, oldValue, scope) {
                try {
                    if (typeof newValue !== 'undefined' && newValue !== "" && newValue !== oldValue) {
                        wsdl.disableReqEle = true;
                    } else {
                        wsdl.disableReqEle = false;
                    }
                } catch (err) {
                    $log.error('Error while watching targetNamespace scope object', err);
                }
            });

            //Function for displaying Request Element popup
            $scope.addRequestElement = function(wsdl) {
                try {
                    wsdl.showDialog = true;
                    wsdl.showReqEle = true;
                    wsdl.hasError = false;
                    options.template = 'requestElementDialog';
                    options.controller = $controller('requestElementCtrl', {
                        $scope: $scope,
                        wsdl: wsdl,
                        controllerAs : 'elementCtrl'
                    });
                    
                    ngDialog.open(options);
                } catch (err) {
                    $log.error('Error while rendering request element window ', err);
                    wsdl.hasError = true;
                    wsdl.errorMsg = appConstants.SERVICE_ERROR;
                }
            };

            //Function for displaying Response Element popup
            $scope.addResponseElement = function(wsdl) {
                try {
                    wsdl.showDialog = true;
                    wsdl.showResEle = true;
                    wsdl.hasError = false;
                    options.template = 'responseElementDialog';
                    options.controller = $controller('responseElementCtrl', {
                        $scope: $scope,
                        wsdl: wsdl
                    });
                    ngDialog.open(options);
                } catch (err) {
                    $log.error('Error while rendering response element window ', err);
                    wsdl.hasError = true;
                    wsdl.errorMsg = appConstants.SERVICE_ERROR;
                }
            };

            //Function for displaying Request Message popup
            $scope.addRequestMessage = function() {
                try {
                    wsdl.showDialog = true;
                    wsdl.showReqMsg = true;
                    wsdl.hasError = false;
                    options.template = 'requestMessageDialog';
                    options.controller = $controller('requestMessageCtrl', {
                        $scope: $scope,
                        wsdl: wsdl
                    });
                    ngDialog.open(options);
                } catch (err) {
                    $log.error('Error while rendering request message window ', err);
                    wsdl.hasError = true;
                    wsdl.errorMsg = appConstants.SERVICE_ERROR;
                }
            };

            //Function for displaying Response Message popup
            $scope.addResponseMessage = function() {
                try {
                    wsdl.showDialog = true;
                    wsdl.showResMsg = true;
                    wsdl.hasError = false;
                    options.template = 'responseMessageDialog';
                    options.controller = $controller('responseMessageCtrl', {
                        $scope: $scope,
                        wsdl: wsdl
                    });
                    ngDialog.open(options);
                } catch (err) {
                    $log.error('Error while rendering response message window ', err);
                    wsdl.hasError = true;
                    wsdl.errorMsg = appConstants.SERVICE_ERROR;
                }
            };
            
            //Function for displaying Operation popup
            $scope.addOperation = function() {
                try {
                    wsdl.showDialog = true;
                    wsdl.showOperatn = true;
                    wsdl.hasError = false;
                    options.template = 'operationDialog';
                    options.controller = $controller('operationCtrl', {
                        $scope: $scope,
                        wsdl: wsdl
                    });
                    ngDialog.open(options);
                } catch (err) {
                    $log.error('Error while rendering operation window ', err);
                    wsdl.hasError = true;
                    wsdl.errorMsg = appConstants.SERVICE_ERROR;
                }
            };
            
            //Function for displaying SOAP Address popup
            $scope.addSoapAddress = function() {
                try {
                    wsdl.showDialog = true;
                    wsdl.showSoapAddr = true;
                    wsdl.hasError = false;
                    options.template = 'soapAddrDialog';
                    options.controller = $controller('soapAddressCtrl', {
                        $scope: $scope,
                        wsdl: wsdl
                    });
                    ngDialog.open(options);
                } catch (err) {
                    $log.error('Error while rendering soap address window ', err);
                    wsdl.hasError = true;
                    wsdl.errorMsg = appConstants.SERVICE_ERROR;
                }
            };
            
            //Function for sending WSDL Request object and generating SOAP WSDL
            $scope.generateWsdl = function() {
                try {
                    var wsdlRequest = wsdlDataService.getWsdlRequest();
                    var d  = new Date();
                    wsdlRequest.created_at = d.toDateString();
                    wsdlRequest.created_by = $window.guest;
                    wsdlAPI.generateWSDL(wsdlRequest).then(function(data) {
                        if (data && data.errMsg) {
                            wsdl.hasError = true;
                            wsdl.errorMsg = data.errMsg;
                            return;
                        }
                        else if (data && !data.errMsg) {
                            wsdl.hasError = false;
                            var f = new Blob([data], { type: 'text/wsdl' });
                            FileSaver.saveAs(f, wsdlRequest.serviceName + '.wsdl');
                        }
                        else{
                            wsdl.hasError = true;
                            wsdl.errorMsg = appConstants.WSDL_GENERATE_ERR;
                        }
                    }).catch(function(err) {
                        wsdl.hasError = true;
                        wsdl.errorMsg = appConstants.WSDL_GENERATE_ERR;
                    });
                } catch (err) {
                    $log.error('Error while generating SOAP-WSDL  ', err);
                    wsdl.hasError = true;
                    wsdl.errorMsg = appConstants.WSDL_GENERATE_ERR;
                }
            };

        }]);