 'use strict';

angular.module('wsdlApp')
 
 .controller('homeCtrl', ['wsdlDataService',
                     function(wsdlDataService) {
       var me = this;
       wsdlDataService.reset();
}]);