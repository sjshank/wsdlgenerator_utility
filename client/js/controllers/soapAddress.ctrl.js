'use strict';

angular.module('wsdlApp')
    
    //Controller responsible for adding new SOAP Response Message and Mapping with response element popup request. 
    .controller('soapAddressCtrl', ['$scope', '$log', '$rootScope', 'ngDialog', 'wsdlDataService', 'wsdl', 'appConstants',
        function($scope, $log, $rootScope, ngDialog, wsdlDataService, wsdl, appConstants) {
            wsdl.errorExist = false;
            $scope.add = function() {
                try {
                    wsdl.errorExist = false;
                    wsdlDataService.setWsdlRequest(wsdl.wsdlObject);
                    wsdl.disableGenerate = false;
                    ngDialog.close();
                } catch (err) {
                    $log.error('Error while adding soap address Object and closing window ', err);
                    wsdl.errorExist = true;
                    wsdl.errorMsg = appConstants.SOAP_ADDR_ERR;
                }
            };
        }]);