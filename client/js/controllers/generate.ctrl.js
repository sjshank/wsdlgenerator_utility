'use strict';

angular.module('wsdlApp')

    .controller('generateCtrl', ['$scope', '$rootScope', '$log', 'wsdlAPI', 'appConstants', 'ngDialog',
        'wsdlDataService', '$controller', 'FileSaver', 'Blob',
        function($scope, $rootScope, $log, wsdlAPI, appConstants, ngDialog,
            wsdlDataService, $controller, FileSaver, Blob) {
            var wsdl = this;
            wsdl.hasError = false;
            wsdl.dataTypes = appConstants.DATA_TYPES;
            wsdl.disableReqEle = true;
            wsdl.disableResEle = true;
            wsdl.disableReqMsg = true;
            wsdl.disableResMsg = true;
            wsdl.disableGenerate = true;
            wsdl.showDialog = false;
            wsdl.showReqEle = false;
            wsdl.showResEle = false;
            wsdl.showReqMsg = false;
            wsdl.showResMsg = false;
            
            //Initialize wsdl request object
            try {
                wsdlDataService.reset();
                wsdl.wsdlObject = wsdlDataService.getWsdlRequest();
            } catch (err) {
                $log.error('Error while initializing WSDL Object ', err);
            }


            //watch function for serviceName.
            $scope.$watch('wsdl.wsdlObject.serviceName', function(newValue, oldValue, scope) {
                try {
                    if (typeof newValue !== 'undefined' && newValue !== "" && newValue !== oldValue) {
                        wsdl.wsdlObject.targetNamespace = 'http://service.lfg.com/' + wsdl.wsdlObject.serviceName;
                        wsdl.disableReqEle = false;
                    } else {
                        wsdl.wsdlObject.targetNamespace = 'http://service.lfg.com/';
                        wsdl.disableReqEle = true;
                    }
                } catch (err) {
                    $log.error('Error while watching serviceName scope object', err);
                }
            });

            $scope.addRequestElement = function(wsdl) {
                try {
                    wsdl.showDialog = true;
                    wsdl.showReqEle = true;
                    wsdl.hasError = false;
                    ngDialog.open(
                        {
                            template: 'requestElementDialog',
                            className: 'ngdialog-theme-default',
                            scope: $scope,
                            overlay: true,
                            controller: $controller('requestElementCtrl', {
                                $scope: $scope,
                                wsdl: wsdl
                            }),
                            closeByNavigation: true,
                            preCloseCallback: function(value) {
                            }
                        });
                } catch (err) {
                    $log.error('Error while rendering request element window ', err);
                    wsdl.hasError = true;
                    wsdl.errorMsg = appConstants.SERVICE_ERROR;
                }
            };

            $scope.addResponseElement = function(wsdl) {
                try {
                    wsdl.showDialog = true;
                    wsdl.showResEle = true;
                    wsdl.hasError = false;
                    ngDialog.open(
                        {
                            template: 'responseElementDialog',
                            className: 'ngdialog-theme-default',
                            scope: $scope,
                            overlay: true,
                            controller: $controller('responseElementCtrl', {
                                $scope: $scope,
                                wsdl: wsdl
                            }),
                            closeByNavigation: true,
                            preCloseCallback: function(value) {
                            }
                        });
                } catch (err) {
                    $log.error('Error while rendering response element window ', err);
                    wsdl.hasError = true;
                    wsdl.errorMsg = appConstants.SERVICE_ERROR;
                }
            };

            $scope.addRequestMessage = function() {
                try {
                    wsdl.showDialog = true;
                    wsdl.showReqMsg = true;
                    wsdl.hasError = false;
                    ngDialog.open(
                        {
                            template: 'requestMessageDialog',
                            className: 'ngdialog-theme-default',
                            scope: $scope,
                            overlay: true,
                            controller: $controller('requestMessageCtrl', {
                                $scope: $scope,
                                wsdl: wsdl
                            }),
                            closeByNavigation: true,
                            preCloseCallback: function(value) {
                            }
                        });
                } catch (err) {
                    $log.error('Error while rendering request message window ', err);
                    wsdl.hasError = true;
                    wsdl.errorMsg = appConstants.SERVICE_ERROR;
                }
            };

            $scope.addResponseMessage = function() {
                try {
                    wsdl.showDialog = true;
                    wsdl.showResMsg = true;
                    wsdl.hasError = false;
                    ngDialog.open(
                        {
                            template: 'responseMessageDialog',
                            className: 'ngdialog-theme-default',
                            scope: $scope,
                            overlay: true,
                            controller: $controller('responseMessageCtrl', {
                                $scope: $scope,
                                wsdl: wsdl
                            }),
                            closeByNavigation: true,
                            preCloseCallback: function(value) {
                            }
                        });
                } catch (err) {
                    $log.error('Error while rendering response message window ', err);
                    wsdl.hasError = true;
                    wsdl.errorMsg = appConstants.SERVICE_ERROR;
                }
            };

            $scope.generateWsdl = function() {
                var wsdlRequest = wsdlDataService.getWsdlRequest();
                wsdlAPI.generateWSDL(wsdlRequest).then(function(data) {
                    if (data && data.errMsg) {
                        wsdl.hasError = true;
                        wsdl.errorMsg = data.errMsg;
                        return;
                    }
                    wsdl.hasError = false;
                    var f = new Blob([data], { type: 'text/wsdl' });
                    FileSaver.saveAs(f, 'SOAP_WSDL.wsdl');
                }).catch(function(err) {
                    wsdl.hasError = true;
                    wsdl.errorMsg = appConstants.SERVICE_ERROR;
                });
            };

        }]);