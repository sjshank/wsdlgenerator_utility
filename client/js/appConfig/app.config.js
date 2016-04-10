/*
*   Module for configuring constants and rootscopes
*/

'use strict';

angular
    .module('app.config', [])
    .constant('appConstants', {
        SERVICE_ERROR : "Service is temporarily unavailable. Please try after sometime.",
        SERVICE_NAME_REG_EX : /^[a-zA-Z]{3,30}$/,
})
.run(['$rootScope', function(rootScope){
    rootScope.subHeading = "A MEAN Stack based utility to generate draft version of SOAP-WSDL.";
    rootScope.SERVICE_NAME_ERR = "Please enter a valid service name.";
}]);