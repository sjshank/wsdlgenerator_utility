'use strict';

angular.module('wsdlApp')
    
    //Controller responsible for adding new SOAP Request Message and Mapping with request element popup request. 
    .controller('requestMessageCtrl', ['$scope', '$log', '$rootScope', 'ngDialog', 'wsdlDataService', 'wsdl', 'appConstants',
        function($scope, $log, $rootScope, ngDialog, wsdlDataService, wsdl, appConstants) {
            wsdl.errorExist = false;
            
            //Function for adding SOAP request message
            $scope.add = function() {
                //TO-DO
                try {
                    wsdl.errorExist = false;
                    wsdlDataService.setWsdlRequest(wsdl.wsdlObject);
                    wsdl.disableResMsg = false;
                    ngDialog.close();
                } catch (err) {
                    $log.error('Error while adding Request Message Object and closing window ', err);
                    wsdl.errorExist = true;
                    wsdl.errorMsg = appConstants.REQ_MESSAGE_ERR;
                }
            };
        }]);