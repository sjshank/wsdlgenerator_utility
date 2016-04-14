'use strict';

angular.module('wsdlApp')

     //Controller responsible for adding new Response Element popup request
    .controller('responseElementCtrl', ['$scope', '$rootScope', 'ngDialog', 'wsdlDataService', 'wsdl',
        function($scope, $rootScope, ngDialog, wsdlDataService, wsdl) {
            wsdl.errorExist = false;
            
            //Function for adding Response Element 
            $scope.add = function() {
                try {
                    wsdl.errorExist = false;
                    wsdlDataService.setWsdlRequest(wsdl.wsdlObject);
                    if (wsdlDataService.getResponseEleLength() >= 1) {
                        if (wsdl.wsdlObject.requestElements[0]['name'] !== '') {
                            wsdl.disableReqMsg = false;
                            wsdl.showResEle = false;
                        } else {
                            wsdl.disableReqMsg = true;
                        }
                    } else {
                        wsdl.disableReqMsg = true;
                    }
                    ngDialog.close();
                } catch (err) {
                    $log.error('Error while adding Response Element Object and closing window ', err);
                    wsdl.errorExist = true;
                    wsdl.errorMsg = appConstants.RES_ELEMENT_ERR;
                }
            };
        }]);