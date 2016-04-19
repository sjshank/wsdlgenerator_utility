'use strict';

angular.module('wsdlApp')

     //Controller responsible for adding new Response Element popup request
    .controller('responseElementCtrl', ['$scope', '$rootScope', 'ngDialog', 'wsdlDataService', 'wsdl',
        function($scope, $rootScope, ngDialog, wsdlDataService, wsdl) {
            wsdl.errorExist = false;
            
            //Function for adding new elements inside requestElements array
            $scope.addElement = function(currentResElement) {
                try {
                    wsdl.errorExist = false;
                    var totalElements = parseInt(currentResElement[0]['elements'].length);

                    currentResElement[0]['elements'].push(
                        {
                            input: "",
                            dataType: "String",
                            id: 'output' + parseInt(totalElements + 1)
                        });
                    if (totalElements === 4) {
                        wsdl.elementLimit = true;
                    }
                } catch (err) {
                    $log.error('Error while adding new element ', err);
                    wsdl.errorExist = true;
                    wsdl.errorMsg = appConstants.NEW_ELEMENT_ERR;
                }
            };
            
            //Function for removing elements from requestElements array
            $scope.removeElement = function(currentResElement) {
                try {
                    wsdl.errorExist = false;
                    var index = -1;
                    var l = wsdl.wsdlObject.responseElements.length;
                    for (var i = 0; i <= l - 1; i++) {
                        if (wsdl.wsdlObject.responseElements[i]['elements'][i]['id'] === currentResElement[0]['elements'][0].id) {
                            index = i;
                            wsdl.wsdlObject.responseElements[i]['elements'].splice(index, 1);
                            break;
                        }
                    }

                    if (l < 5) {
                        wsdl.elementLimit = false;
                    }
                } catch (err) {
                    $log.error('Error while removing element ', err);
                    wsdl.errorExist = true;
                    wsdl.errorMsg = appConstants.DELETE_ELEMENT_ERR;
                }
            };
            
            //Function for adding Response Element 
            $scope.add = function() {
                try {
                    wsdl.errorExist = false;
                    wsdlDataService.setWsdlRequest(wsdl.wsdlObject);
                    if (wsdlDataService.getResponseEleLength() >= 1) {
                        if (wsdl.wsdlObject.requestElements[0]['name'] !== '') {
                            wsdl.disableReqMsg = true;
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