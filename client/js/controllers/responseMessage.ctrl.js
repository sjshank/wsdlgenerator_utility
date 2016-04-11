'use strict';

angular.module('wsdlApp')

    .controller('responseMessageCtrl', ['$scope', '$log', '$rootScope', 'ngDialog', 'wsdlDataService', 'wsdl', 'appConstants',
        function($scope, $log, $rootScope, ngDialog, wsdlDataService, wsdl, appConstants) {
            wsdl.errorExist = false;
            $scope.add = function() {
                try {
                    wsdl.errorExist = false;
                    wsdlDataService.setWsdlRequest(wsdl.wsdlObject);
                    wsdl.disableGenerate = false;
                    ngDialog.close();
                } catch (err) {
                    $log.error('Error while adding Request Message Object and closing window ', err);
                    wsdl.errorExist = true;
                    wsdl.errorMsg = appConstants.REQ_MESSAGE_ERR;
                }
            };
        }]);