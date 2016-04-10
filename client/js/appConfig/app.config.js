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
    rootScope.subHeading = "A MEAN Stack based web portal to generate draft version of SOAP-WSDL. Grab WSDL and save in your pocket.";
    rootScope.SERVICE_NAME_ERR = "Please enter a valid service name.";
    rootScope.REQ_ELE_NAME_ERR = "Please enter a valid request name.";
    rootScope.RES_ELE_NAME_ERR = "Please enter a valid response name.";
    rootScope.ELEMENT_NAME_ERR = "Please enter a valid input.";
}]);