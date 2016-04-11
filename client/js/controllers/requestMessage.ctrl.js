'use strict';

angular.module('wsdlApp')

    .controller('requestMessageCtrl', ['$scope', '$log', '$rootScope', 'ngDialog', 'wsdlDataService', 'wsdl', 'appConstants',
        function($scope, $log, $rootScope, ngDialog, wsdlDataService, wsdl, appConstants) {
            wsdl.errorExist = false;
            $scope.add = function() {
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