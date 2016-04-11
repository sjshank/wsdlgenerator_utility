/*
*   Module for configuring constants and rootscopes
*/

'use strict';

angular
    .module('app.config', [])
    .constant('appConstants', {
        SERVICE_ERROR : "Service is temporarily unavailable. Please try after sometime.",
        SERVICE_NAME_REG_EX : /^[a-zA-Z]{3,30}$/i,
        ALPHA_NUMERIC_REG_EX :/^[a-z0-9]{3,15}$/i,
        RES_ELEMENT_ERR : "Failed to Response Elements. Please try again.",
        REQ_ELEMENT_ERR : "Failed to Request Elements. Please try again.",
        DELETE_ELEMENT_ERR : "Failed to Delete Element. Please try again.",
        NEW_ELEMENT_ERR : "Failed to Append New Element. Please try again.",
        REQ_MESSAGE_ERR : "Failed to Add SOAP Request Message. Please try again.",
        RES_MESSAGE_ERR : "Failed to Add SOAP Response Message. Please try again."
})
.run(['$rootScope', function(rootScope){
    rootScope.subHeading = "A MEAN Stack based web portal to generate draft version of SOAP-WSDL. Grab WSDL and save in your pocket.";
    rootScope.SERVICE_NAME_ERR = "Please enter a valid service name.";
    rootScope.REQ_ELE_NAME_ERR = "Please enter a valid request name.";
    rootScope.RES_ELE_NAME_ERR = "Please enter a valid response name.";
    rootScope.ELEMENT_NAME_ERR = "Please enter a valid input.";
    rootScope.REQ_MSG_NAME_ERR = "Please enter a valid SOAP Request Message.";
    rootScope.RES_MSG_NAME_ERR = "Please enter a valid SOAP Response Message.";
}]);