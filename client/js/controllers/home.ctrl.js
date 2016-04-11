'use strict';

angular.module('wsdlApp')

    .controller('homeCtrl', ['wsdlDataService',
        function(wsdlDataService) {
            var me = this;
            try {
                wsdlDataService.reset();
            } catch (err) {
                $log.error('Error while initializing WSDL Object ', err);
            }
        }]);