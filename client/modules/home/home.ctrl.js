'use strict';

angular.module('wsdlApp')

    .controller('homeCtrl', ['wsdlDataService', '$scope', '$window', '$location',
        function(wsdlDataService, $scope, $window, $location) {
            var me = this;
            me.employee = "";
            try {
                wsdlDataService.reset();
                $scope.redirect = function(me){
                    $window.guest = me.employee;
                    $location.path('/generate');
                }
            } catch (err) {
                $log.error('Error while redirecting user to generate screen ', err);
            }
        }]);