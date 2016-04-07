'use strict';

angular.module('wsdlApp')
    
    .controller('generateCtrl', ['$scope', '$log', 'wsdlAPI', 'appConstants', function($scope, $log, wsdlAPI, appConstants) {
       var me = this;
       me.hasError = false;
       me.wsdlObject = {};
       
       //watch function for state value to display/hide city text box
        $scope.$watch('me.wsdlObject.serviceName', function(newValue, oldValue, scope) {
               if(typeof newValue !== 'undefined' && newValue !== "" && newValue !== oldValue)
                    me.wsdlObject.targetNamespace = 'http://service.lfg.com/' + me.wsdlObject.serviceName;
                else
                    me.wsdlObject.targetNamespace = 'http://service.lfg.com/';
        });
       
       $scope.generateWsdl = function () {
           wsdlAPI.generateWSDL(me.wsdlRequestObj).then( function(data) {
                $log.info(data);
            });
       };
       
    }]);