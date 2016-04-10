'use strict';

angular.module('wsdlApp')
    
    .controller('generateCtrl', ['$scope', '$rootScope', '$log', 'wsdlAPI', 'appConstants', 'ngDialog', 'wsdlDataService', '$controller',
                     function($scope, $rootScope, $log, wsdlAPI, appConstants, ngDialog, wsdlDataService, $controller) {
       var me = this;
       wsdlDataService.reset();
       me.hasError = false;
       me.dataTypes = ['String', 'Integer', 'Boolean'];
       me.wsdlObject = wsdlDataService.getWsdlRequest();
       me.disableReqEle = true;
       me.disableResEle = true;
       me.disableReqMsg = true;
       me.disableResMsg = true;
       me.disableGenerate = true;
       me.showDialog = false;
       me.showReqEle = false;
       me.showResEle = false;
       me.showReqMsg = false;
       me.showResMsg = false;
       
       
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
        
        $scope.addRequestElement = function (me) {
            me.showDialog = true;
            me.showReqEle = true;
            ngDialog.open(
                {
                template: 'dialogTemplId',
                className: 'ngdialog-theme-default',
                scope: $scope,
                overlay: true,
                controller: $controller('requestElementCtrl', {
                    $scope: $scope,
                    wsdl: me
                }),
                closeByNavigation: true,
                preCloseCallback: function(value) {
                }
            });
        };
        
         $scope.addResponseElement = function (me) {
            me.showDialog = true;
            me.showResEle = true;
            ngDialog.open(
                {
                template: 'dialogTemplId',
                className: 'ngdialog-theme-default',
                scope: $scope,
                overlay: true,
                controller: $controller('responseElementCtrl', {
                    $scope: $scope,
                    wsdl: me
                }),
                closeByNavigation: true,
                preCloseCallback: function(value) {
                }
            });
            
        };
     
       $scope.addRequestMessage = function () {
           
       };
       
       $scope.addResponseMessage = function () {
          
       };
       
       $scope.generateWsdl = function () {
           wsdlAPI.generateWSDL(me.wsdlRequestObj).then( function(data) {
                $log.info(data);
            });
       };
       
}]);