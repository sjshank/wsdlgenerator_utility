/*
*   Module for configuring constants and rootscopes
*/

'use strict';

angular
    .module('app.config', [])
    .constant('appConstants', {
        SERVICE_ERROR : "Service is temporarily unavailable. Please try after sometime.",
        ALPHA_REG_EX : /^[a-zA-Z]+$/,
})
.run(['$rootScope', function(rootScope){
    rootScope.subHeading = "A MEAN Stack based utility to generate draft version of SOAP-WSDL.";
}]);