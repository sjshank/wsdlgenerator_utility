'use strict';

angular.module('wsdlApp')
    
    //Controller responsible for adding new Request Element popup request.
    .controller('requestElementCtrl', ['$scope', '$log', 'ngDialog', 'wsdlDataService', 'wsdl', 'appConstants',
        function($scope, $log, ngDialog, wsdlDataService, wsdl, appConstants) {
            wsdl.errorExist = false;
            $scope.isReadonly = 'hello';
            //Function for adding new elements inside requestElements array
            $scope.addElement = function(currentReqElement) {
                try {
                    wsdl.errorExist = false;
                    var totalElements = parseInt(currentReqElement[0]['elements'].length);

                    currentReqElement[0]['elements'].push(
                        {
                            input: "",
                            dataType: "String",
                            id: 'input' + parseInt(totalElements + 1)
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
            $scope.removeElement = function(currentReqElement) {
                try {
                    wsdl.errorExist = false;
                    var index = -1;
                    var l = wsdl.wsdlObject.requestElements.length;
                    for (var i = 0; i <= l - 1; i++) {
                        if (wsdl.wsdlObject.requestElements[i]['elements'][i]['id'] === currentReqElement[0]['elements'][0].id) {
                            index = i;
                            wsdl.wsdlObject.requestElements[i]['elements'].splice(index, 1);
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
            
            //Function for adding requestElements inside WSDL Request
            $scope.add = function(wsdl) {

                try {
                    wsdl.errorExist = true;
                    wsdlDataService.setWsdlRequest(wsdl.wsdlObject);
                    if (wsdlDataService.getRequestEleLength() >= 1) {
                        if (wsdl.wsdlObject.requestElements[0]['name'] !== '') {
                            wsdl.disableResEle = true;
                            wsdl.showReqEle = false;
                            
                        } else {
                            wsdl.disableResEle = false;
                        }
                    } else {
                        wsdl.disableResEle = false;
                    }
                    ngDialog.close();
                } catch (err) {
                    $log.error('Error while adding Request Element Object and closing window ', err);
                    wsdl.errorExist = true;
                    wsdl.errorMsg = appConstants.REQ_ELEMENT_ERR;
                }
            };
        }]);