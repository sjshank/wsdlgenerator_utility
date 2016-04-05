/*
*	
*/
'use strict';

const log4js = require('log4js'),
      Promise = require('bluebird'),
      builder = Promise.promisifyAll(require("xmlbuilder")),
      constants = require('../utils/appConstants'),
      log = log4js.getLogger("xmlBuilderHelper");      
      
exports.buildXMLDoc = function (requestObject) {
    log.debug("******Build XML Doc Starts******");
    var xmlDoc = builder.create(constants.ROOT, {'version': '1.0', 'encoding': 'UTF-8'})
                    .att("name","serviceName") //Replace with servicename
                    .att("targetNamespace","http://service.lfg.com/serviceName/") //Replace with targetnamespace
                    .att('xmlns:wsdl', constants.XMLNS_WSDL)
                    .att('xmlns:soap', constants.XMLNS_SOAP)
                    .att('xmlns:tns', constants.XMLNS_TNS + 'serviceName/')
                    .att('xmlns:bons2', constants.XMLNS_BONS2)
                    .att('xmlns:xsd', constants.XMLNS_XSD);
                    
                    getWsdlTypesEle(xmlDoc, requestObject);
                    getWsdlMessageEle(xmlDoc, requestObject);
                    getPortTypeEle(xmlDoc, requestObject);
                    /*getPortTypeEle(xmlDoc, requestObject);
                    getSoapBindingEle(xmlDoc, requestObject);
                    getSoapAddressEle(xmlDoc, requestObject);*/
                        
     return xmlDoc.toString();
};

function getWsdlTypesEle(xmlDoc, req){
    
    //It should be converted into dynamic based on request
    var o = {
           'xsd:element' : {
            '@name': "variableName",
            '@type': "xsd:Type"
        }
    };
    var b = {
           'xsd:element' : {
            '@name': "variableName",
            '@type': "xsd:Type"
        }
    };
    var a = [o, b];
    
    
        xmlDoc.ele(constants.WSDL_TYPES)
                .ele(constants.XSD_SCHEMA)
                .att('targetNamespace', 'http://service.lfg.com/SampleBusinessService/').up()
                   .ele(constants.XSD_ELEMENT)
                   .att('name', 'requestElementName')
                     .ele(constants.XSD_COMPLEX_TYPE)
                       .ele(constants.XSD_SEQUENCE)
                        .ele(a).up();
                       
                                            
        
};


function getWsdlMessageEle(xmlDoc, req){
        xmlDoc.ele(constants.WSDL_MESSAGE)
                  .att('name', 'requestMessageName')
                            .ele(constants.WSDL_PART)
                                .att('element', 'tns:requestElementName')
                                .att('name', 'parameters').up();
                                
        xmlDoc.ele(constants.WSDL_MESSAGE)
                  .att('name', 'responseMessageName')
                            .ele(constants.WSDL_PART)
                                .att('element', 'tns:responseElementName')
                                .att('name', 'parameters').up();
};

function getPortTypeEle(xmlDoc, req){
        xmlDoc.ele(constants.WSDL_PORT_TYPE)
                  .att('name', 'serviceName')
                            .ele(constants.WSDL_OPERATION)
                            .att('name', 'methodName')
                               .ele(constants.WSDL_IN)
                               .att('name', 'tns:requestMessageName').up()
                               .ele(constants.WSDL_OU)
                               .att('name', 'tns:responseMessageName').up();
                                
};