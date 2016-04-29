'use strict';

angular.module('wsdlApp')
    
    //Controller responsible for adding new SOAP Response Message and Mapping with response element popup request. 
    .controller('responseMessageCtrl', ['$scope', '$log', '$rootScope', 'ngDialog', 'wsdlDataService', 'wsdl', 'appConstants',
        function($scope, $log, $rootScope, ngDialog, wsdlDataService, wsdl, appConstants) {
            wsdl.errorExist = false;
            $scope.add = function(wsdl) {
                try {
                    wsdl.errorExist = false;
                    wsdlDataService.setWsdlRequest(wsdl.wsdlObject);
                    wsdl.disableOperatn = true;
                    ngDialog.close();
                } catch (err) {
                    $log.error('Error while adding Request Message Object and closing window ', err);
                    wsdl.errorExist = true;
                    wsdl.errorMsg = appConstants.REQ_MESSAGE_ERR;
                }
            };
        }]);