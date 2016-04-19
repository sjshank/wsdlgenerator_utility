/*
*	
*/
'use strict';

const log4js = require('log4js'),
    Promise = require('bluebird'),
    builder = Promise.promisifyAll(require("xmlbuilder")),
    constants = require('../utils/appConstants'),
    log = log4js.getLogger("xmlBuilderHelper"),
    wsdlRequestModel = require('../services/wsdlRequest.service.js').getWsdlRequest();

exports.buildXMLDoc = function() {
    try {
        log.debug("******Build XML Doc Starts******");
                var xmlDoc = builder.create(constants.ROOT, { 'version': '1.0', 'encoding': 'UTF-8' })
                    .att("name", wsdlRequestModel.serviceName) //Replace with servicename
                    .att("targetNamespace", wsdlRequestModel.targetNamespace) //Replace with targetnamespace
                    .att('xmlns:wsdl', constants.XMLNS_WSDL)
                    .att('xmlns:soap', constants.XMLNS_SOAP)
                    .att('xmlns:tns', constants.XMLNS_TNS + wsdlRequestModel.serviceName)
                    .att('xmlns:bons2', constants.XMLNS_BONS2)
                    .att('xmlns:xsd', constants.XMLNS_XSD);

                getWsdlTypesEle(xmlDoc);
                getWsdlMessageEle(xmlDoc);
                getPortTypeEle(xmlDoc);
                getSoapBindingEle(xmlDoc);
                getSoapAddressEle(xmlDoc);

                log.debug("******XML DOC******", xmlDoc.toString());
                return xmlDoc.toString();
    } catch (err) {
        log.error("Error while building XML doc in xmlDocHelper  ", err);
        throw err;
    }
};

function getWsdlTypesEle(xmlDoc) {
   
    xmlDoc.ele(constants.WSDL_TYPES)
        .ele(constants.XSD_SCHEMA)
        .att('targetNamespace', wsdlRequestModel.targetNamespace)
        .ele(wsdlRequestModel.requestElements).up()
        .ele(wsdlRequestModel.responseElements).up();
};

function getWsdlMessageEle(xmlDoc) {

    //This comes under for loop based on I/O message paramters from user
    xmlDoc.ele(wsdlRequestModel.requestMessages).up();
    xmlDoc.ele(wsdlRequestModel.responseMessages).up();

};

function getPortTypeEle(xmlDoc) {

    xmlDoc.ele(constants.WSDL_PORT_TYPE)
        .att('name', wsdlRequestModel.serviceName)
        .ele(wsdlRequestModel.operations).up();
};

function getSoapBindingEle(xmlDoc) {

    xmlDoc.ele(constants.WSDL_BINDING)
        .att('name', wsdlRequestModel.serviceName + 'SOAP')
        .att('type', 'tns:' + wsdlRequestModel.serviceName)
        .ele(constants.SOAP_BINDING)
        .att('style', 'document')
        .att('transport', constants.TRANSPORT_URL).up()
        .ele(wsdlRequestModel.soapBinding).up();
};

function getSoapAddressEle(xmlDoc, wsdlRequest) {
  
    xmlDoc.ele(constants.WSDL_SERVICE)
        .att('name', wsdlRequestModel.serviceName)
        .ele(constants.WSDL_PORT)
        .att('binding', 'tns:' + wsdlRequestModel.serviceName + 'SOAP')
        .att('name', wsdlRequestModel.serviceName + 'SOAP')
        .ele(wsdlRequestModel.soapAddress).up()
};