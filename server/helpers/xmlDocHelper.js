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
                    
                    getSoapBindingEle(xmlDoc, requestObject);
                    getSoapAddressEle(xmlDoc, requestObject);
                        
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
    
    //It should be converted into dynamic based on request
    var c = {
           'xsd:element' : {
            '@name': "variableName",
            '@type': "xsd:Type"
        }
    };
    var d = {
           'xsd:element' : {
            '@name': "variableName",
            '@type': "xsd:Type"
        }
    };
    var e = [c, d];
    
    
        xmlDoc.ele(constants.WSDL_TYPES)
                .ele(constants.XSD_SCHEMA)
                .att('targetNamespace', 'http://service.lfg.com/SampleBusinessService/')
                   .ele(constants.XSD_ELEMENT)
                   .att('name', 'requestElementName')
                     .ele(constants.XSD_COMPLEX_TYPE)
                       .ele(constants.XSD_SEQUENCE)
                        .ele(a).up().up().up().up()
                        .ele(constants.XSD_ELEMENT)
                            .att('name', 'responseElementName')
                                .ele(constants.XSD_COMPLEX_TYPE)
                                .ele(constants.XSD_SEQUENCE)
                                    .ele(e).up();
};


function getWsdlMessageEle(xmlDoc, req){
    //This comes under for loop based on I/O message paramters from user
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
    
    //It should be converted into dynamic based on request
    var a = {
           'wsdl:operation' : {
            '@name': "methodName",
            'wsdl:input' : {
                '@name': "tns:requestMessageName"
            },
            'wsdl:output' : {
                '@name': "tns:responseMessageName"
            }
        }
    };
    var b = {
           'wsdl:operation' : {
            '@name': "methodName",
            'wsdl:input' : {
                '@name': "tns:requestMessageName"
            },
            'wsdl:output' : {
                '@name': "tns:responseMessageName"
            }
        }
    };
    var o = [a, b];
    
        xmlDoc.ele(constants.WSDL_PORT_TYPE)
                  .att('name', 'serviceName')
                      .ele(o).up();
};

function getSoapBindingEle(xmlDoc, requestObject) {
     //It should be converted into dynamic based on request
    var a = {
           'wsdl:operation' : {
            '@name': "methodName",
            'soap:operation' : {
                '@soapAction': "http://service.lfg.com/serviceName/methodName"
            },
            'wsdl:input' : {
                'soap:body': {
                    '@use' : 'literal'
                }
            },
            'wsdl:output' : {
                'soap:body': {
                    '@use' : 'literal'
                }
            }
        }
    };
    
    var o = [a];
    
        xmlDoc.ele(constants.WSDL_BINDING)
                .att('name', 'serviceNameSOAP')
                .att('type', 'tns:serviceName')
                  .ele(constants.SOAP_BINDING)
                    .att('style', 'document')
                    .att('transport', constants.TRANSPORT_URL).up()
                      .ele(o).up();
};

function getSoapAddressEle(xmlDoc, requestObject) {    
        xmlDoc.ele(constants.WSDL_SERVICE)
                .att('name', 'serviceName')
                  .ele(constants.WSDL_PORT)
                    .att('binding', 'tns:serviceNameSOAP')
                    .att('name', 'serviceNameSOAP')
                      .ele(constants.SOAP_ADDRESS)
                      .att('location', constants.LOCATION_URL + 'service-root-context/serviceName').up()
}