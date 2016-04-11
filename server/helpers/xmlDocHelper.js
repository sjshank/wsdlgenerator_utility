/*
*	
*/
'use strict';

const log4js = require('log4js'),
    Promise = require('bluebird'),
    builder = Promise.promisifyAll(require("xmlbuilder")),
    constants = require('../utils/appConstants'),
    log = log4js.getLogger("xmlBuilderHelper");

exports.buildXMLDoc = function(wsdlRequest) {
    try {
        log.debug("******Build XML Doc Starts******");
        var sName = wsdlRequest.serviceName;
        var targetNamespace = wsdlRequest.targetNamespace;
        var xmlDoc = builder.create(constants.ROOT, { 'version': '1.0', 'encoding': 'UTF-8' })
            .att("name", sName) //Replace with servicename
            .att("targetNamespace", targetNamespace) //Replace with targetnamespace
            .att('xmlns:wsdl', constants.XMLNS_WSDL)
            .att('xmlns:soap', constants.XMLNS_SOAP)
            .att('xmlns:tns', constants.XMLNS_TNS + sName)
            .att('xmlns:bons2', constants.XMLNS_BONS2)
            .att('xmlns:xsd', constants.XMLNS_XSD);

        getWsdlTypesEle(xmlDoc, wsdlRequest);
        getWsdlMessageEle(xmlDoc, wsdlRequest);
        getPortTypeEle(xmlDoc, wsdlRequest);

        getSoapBindingEle(xmlDoc, wsdlRequest);
        getSoapAddressEle(xmlDoc, wsdlRequest);

        log.debug("******XML DOC******", xmlDoc.toString());
        return xmlDoc.toString();
    } catch (err) {
        log.error("Error while building XML doc in xmlDocHelper  ", err);
        throw err;
    }
};

function getWsdlTypesEle(xmlDoc, wsdlRequest) {

    //It should be converted into dynamic based on request
    var o = {
        'xsd:element': {
            '@name': "variableName",
            '@type': "xsd:Type"
        }
    };
    var b = {
        'xsd:element': {
            '@name': "variableName",
            '@type': "xsd:Type"
        }
    };
    var a = [o, b];

    //It should be converted into dynamic based on request
    var c = {
        'xsd:element': {
            '@name': "variableName",
            '@type': "xsd:Type"
        }
    };
    var d = {
        'xsd:element': {
            '@name': "variableName",
            '@type': "xsd:Type"
        }
    };
    var e = [c, d];


    xmlDoc.ele(constants.WSDL_TYPES)
        .ele(constants.XSD_SCHEMA)
        .att('targetNamespace', wsdlRequest.targetNamespace)
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


function getWsdlMessageEle(xmlDoc, wsdlRequest) {
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

function getPortTypeEle(xmlDoc, wsdlRequest) {

    //It should be converted into dynamic based on request
    var a = {
        'wsdl:operation': {
            '@name': "methodName",
            'wsdl:input': {
                '@name': "tns:requestMessageName"
            },
            'wsdl:output': {
                '@name': "tns:responseMessageName"
            }
        }
    };
    var b = {
        'wsdl:operation': {
            '@name': "methodName",
            'wsdl:input': {
                '@name': "tns:requestMessageName"
            },
            'wsdl:output': {
                '@name': "tns:responseMessageName"
            }
        }
    };
    var o = [a, b];

    xmlDoc.ele(constants.WSDL_PORT_TYPE)
        .att('name', wsdlRequest.serviceName)
        .ele(o).up();
};

function getSoapBindingEle(xmlDoc, wsdlRequest) {
    //It should be converted into dynamic based on request
    var a = {
        'wsdl:operation': {
            '@name': "methodName",
            'soap:operation': {
                '@soapAction': "http://service.lfg.com/" + wsdlRequest.serviceName +"/methodName"
            },
            'wsdl:input': {
                'soap:body': {
                    '@use': 'literal'
                }
            },
            'wsdl:output': {
                'soap:body': {
                    '@use': 'literal'
                }
            }
        }
    };

    var o = [a];

    xmlDoc.ele(constants.WSDL_BINDING)
        .att('name', wsdlRequest.serviceName + 'SOAP')
        .att('type', 'tns:'+wsdlRequest.serviceName)
        .ele(constants.SOAP_BINDING)
        .att('style', 'document')
        .att('transport', constants.TRANSPORT_URL).up()
        .ele(o).up();
};

function getSoapAddressEle(xmlDoc, wsdlRequest) {
    xmlDoc.ele(constants.WSDL_SERVICE)
        .att('name', wsdlRequest.serviceName)
        .ele(constants.WSDL_PORT)
        .att('binding', 'tns:'+wsdlRequest.serviceName+'serviceNameSOAP')
        .att('name', wsdlRequest.serviceName+'SOAP')
        .ele(constants.SOAP_ADDRESS)
        .att('location', constants.LOCATION_URL + 'service-root-context/'+wsdlRequest.serviceName).up()
};