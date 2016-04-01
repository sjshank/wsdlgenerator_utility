'use strict';

angular.module('wsdlApp')
    
    .controller('generateCtrl', ['$scope', '$log', 'wsdlAPI', 'appConstants', function($scope, $log, wsdlAPI, appConstants) {
       var me = this;
       me.hasError = false;
       me.wsdlRequestObj = {};
       
       $scope.generateWsdl = function () {
           wsdlAPI.generateWSDL(me.wsdlRequestObj).then( function(data) {
                $log.info(data);
            });
       };
       
    }]);