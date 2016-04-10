 'use strict';

angular.module('wsdlApp')
 
 .controller('requestElementCtrl', ['$scope', '$rootScope', 'ngDialog', 'wsdlDataService', 'wsdl', '$controller',
                     function($scope, $rootScope, ngDialog, wsdlDataService, me, $controller) {
                
        $scope.addElement = function(){
						var totalElements = me.wsdlObject.requestElement.elements.length;
						me.wsdlObject.requestElement.elements.push(
							{
								input: "",
								dataType: "String",
                                id: 'input' + parseInt(totalElements + 1)
							});
						if(totalElements === 4){
							me.elementLimit = true;
						}

				};
                
        $scope.removeElement = function(element){
                        var index = -1;
                        var l = me.wsdlObject.requestElement.elements.length;
                        for(var i = 0; i <= l - 1; i++){
                            if(me.wsdlObject.requestElement.elements[i]['id'] === element[0].id){
                                index = i;
                                break;
                            }
                        }
                        me.wsdlObject.requestElement.elements.splice( index, 1 );
                        if(l < 5){
                            me.elementLimit = false;
                        }
				};
                
         $scope.add = function(){
                        wsdlDataService.setWsdlRequest(me.wsdlObject);
                        if(wsdlDataService.getRequestEleLength() >= 1){
                            if(me.wsdlObject.requestElement.elements[0]['name'] !== ''){
                                me.disableResEle = false;
                                me.showReqEle = false;
                            }else{
                                 me.disableResEle = true;
                            }
                        }else{
                             me.disableResEle = true;
                        }
                        ngDialog.close();                     
				};
        
}])