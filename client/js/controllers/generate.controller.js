'use strict';

angular.module('wsdlApp')
    
    .controller('generateCtrl', ['$scope',  '$log', 'wsdlAPI', 'appConstants', 'ngDialog',
                     function($scope, $log, wsdlAPI, appConstants, ngDialog) {
       var me = this;
       me.hasError = false;
       me.dataTypes = ['String', 'Integer', 'Boolean'];
       me.wsdlObject = {
           serviceName: '',
           targetNamespace: 'http://service.lfg.com/',
            requestElement : {
                name: '',
                elements: [
                    {input: '', dataType: 'String', id: 'input1'}
                ]
            }
       };
       me.disableReqEle = true;
       me.disableResEle = true;
       me.disableReqMsg = true;
       me.disableResMsg = true;
       me.disableGenerate = true;
       me.showDialog = false;
       
       
       //watch function for state value to display/hide city text box
        $scope.$watch('me.wsdlObject.serviceName', function(newValue, oldValue, scope) {
               if(typeof newValue !== 'undefined' && newValue !== "" && newValue !== oldValue){
                    me.wsdlObject.targetNamespace = me.wsdlObject.targetNamespace + me.wsdlObject.serviceName;
                    me.disableReqEle = false;
               }else{
                    me.wsdlObject.targetNamespace = 'http://service.lfg.com/';
                    me.disableReqEle = true;
               }
        });
        
        $scope.addRequestElement = function () {
            me.showDialog = true;
            ngDialog.open(
                {
                   template: 'dialogTemplId',
                   className: 'ngdialog-theme-default',
                   scope: $scope,
                   overlay: true,
                   closeByNavigation: true,
                   preCloseCallback: function(value) {
                        
                   }
                });
        };
        
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
                        var l = me.wsdlObject.requestElement.elements.length;
                        var index = -1;
                        for(var i = 0; i <= l - 1; i++){
                            if(me.wsdlObject.requestElement.elements[i]['id'] === element.id){
                                index = i;
                                break;
                            }
                        }
                        me.wsdlObject.requestElement.elements.splice( index, 1 );
                        if(me.wsdlObject.requestElement.elements.length < 5){
                            me.elementLimit = false;
                        }
				};
        /*$scope.$watch('me.disableResEle', function(newValue, oldValue, scope) {
               if(newValue !== oldValue){
                    me.disableReqMsg = false;
               }else{                    
                    me.disableReqMsg = true;
               }
        });
        
        $scope.$watch('me.disableReqMsg', function(newValue, oldValue, scope) {
               if(newValue !== oldValue){
                    me.disableResMsg = false;
               }else{                    
                    me.disableResMsg = true;
               }
        });
        
        $scope.$watch('me.disableResMsg', function(newValue, oldValue, scope) {
               if(newValue !== oldValue){
                    me.disableGenerate = false;
               }else{                    
                    me.disableGenerate = true;
               }
        });*/
       
       $scope.generateWsdl = function () {
           wsdlAPI.generateWSDL(me.wsdlRequestObj).then( function(data) {
                $log.info(data);
            });
       };
       
}]);