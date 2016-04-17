/*
*   Module for configuring constants and rootscopes
*/

'use strict';

angular
    .module('app.config', [])
    .constant('appConstants', {
        SERVICE_ERROR: "Service is temporarily unavailable. Please try after sometime.",
        WSDL_GENERATE_ERR: "Failed to generate SOAP WSDL. Please try after sometime.",
        SERVICE_NAME_REG_EX: /^[a-zA-Z_\-]{3,30}$/i,
        TARGET_NAMESPACE_REG_EX: /(https?:\/\/(?:www\.|(?!www))[^\s\.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,})/,
        ALPHA_NUMERIC_REG_EX: /^[a-z0-9]{3,30}$/i,
        PORT_REG_EX: /^[0-9]{2,4}$/i,
        LOCATION_REG_EX: /^[a-zA-Z0-9\.\-]{4,30}$/i,
        CONTEXT_REG_EX: /^[a-zA-Z0-9\-]{4,30}$/i,
        EMPLOYEE_REG_EX : /[0-9]{3,7}$/,
        RES_ELEMENT_ERR: "Failed to Response Elements. Please try again.",
        REQ_ELEMENT_ERR: "Failed to Request Elements. Please try again.",
        DELETE_ELEMENT_ERR: "Failed to Delete Element. Please try again.",
        NEW_ELEMENT_ERR: "Failed to Append New Element. Please try again.",
        REQ_MESSAGE_ERR: "Failed to Add SOAP Request Message. Please try again.",
        RES_MESSAGE_ERR: "Failed to Add SOAP Response Message. Please try again.",
        DATA_TYPES: ['String', 'Integer', 'Boolean'],
        FILE_NAME: 'SOAP_WSDL.wsdl'
    })
    .run(['$rootScope', '$templateCache',  function(rootScope, $templateCache) {
        rootScope.subHeading = "A MEAN Stack based web portal to generate draft version of SOAP-WSDL. Grab WSDL and save in your pocket.";
        rootScope.SERVICE_NAME_ERR = "Please enter a valid service name.";
        rootScope.TARGET_NAMESPACE_ERR = "Please enter a valid target namespace."
        rootScope.REQ_ELE_NAME_ERR = "Please enter a valid request name.";
        rootScope.RES_ELE_NAME_ERR = "Please enter a valid response name.";
        rootScope.ELEMENT_NAME_ERR = "Please enter a valid input.";
        rootScope.REQ_MSG_NAME_ERR = "Please enter a valid SOAP Request Message.";
        rootScope.RES_MSG_NAME_ERR = "Please enter a valid SOAP Response Message.";
        rootScope.METHOD_NAME_ERR = "Please enter a valid method name.";
        rootScope.LOCATION_ERR = "Please enter a valid address.",
        rootScope.PORT_ERR = "Please enter a valid location port.",
        rootScope.CONTEXT_ROOT_ERR = "Please enter a valid context root.",
        rootScope.EMPLOYEE_NAME_ERR = "Please enter a valid employee number."
        $templateCache.put('errorTemplate.html', '<div class="alert alert-danger">{{wsdl.errorMsg}}</div>');
    }]);