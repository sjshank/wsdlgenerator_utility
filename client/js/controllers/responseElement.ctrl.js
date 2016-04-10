 'use strict';

angular.module('wsdlApp')
 
 .controller('responseElementCtrl', ['$scope', '$rootScope', 'ngDialog', 'wsdlDataService', 'wsdl',
                     function($scope, $rootScope, ngDialog, wsdlDataService, me) {
 
         $scope.add = function(){
                        wsdlDataService.setWsdlRequest(me.wsdlObject);
                        if(wsdlDataService.getResponseEleLength() >= 1){
                            if(me.wsdlObject.requestElement.elements[0]['name'] !== ''){
                                me.disableReqMsg = false;
                                me.showResEle = false;
                            }else{
                                me.disableReqMsg = true;
                            }
                        }else{
                            me.disableReqMsg = true;
                        }
                        ngDialog.close();
				};
}]);