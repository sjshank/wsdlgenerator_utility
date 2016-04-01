/*
*	module for calculating distance between 2 geo-location and retreive all stores based on zipcode
*/
'use strict';
const log4js = require('log4js'),
      builder = require("xmlbuilder"),
      log = log4js.getLogger("createController");

//generate wsdl
exports.createWsdl = function(reqObject, resOject) {
    log.debug("Inside createWsdl methond");
    try{
        var doc = builder
            .create('wsdl:definitions', {'version': '1.0', 'encoding': 'UTF-8'})
            .att("name","http://www.intuit.com/sb/cdm/qbo")
            .att("targetNamespace","http://www.intuit.com/sb/cdm/qbo")
            .att("xmlns:wsdl","http://www.intuit.com/sb/cdm/qbo")
            .att("xmlns:soap","http://www.intuit.com/sb/cdm/qbo")
            .att("xmlns:tns","http://www.intuit.com/sb/cdm/v2")
            .att("xmlns:bons2","http://www.intuit.com/sb/cdm/v2")
            .att("xmlns:xsd","http://www.intuit.com/sb/cdm/v2")
                .ele("TypeOf","Person").up()
                .ele("Name","John Doe").up()
                .ele("Address")
                    .ele("Line1","Park Avenue").up()
                    .ele("City","Woodland Hills").up()
                    .ele("CountrySubDivisionCode","CA").up()
                    .ele("PostalCode","91367").up()
                    .up()
                .ele("Phone")
                    .ele("DeviceType","Mobile").up()
                    .ele("FreeFormNumber","(770) 349-1200").up()
                    .up()
                .ele("Phone")
                    .ele("Fax","Mobile").up()
                    .ele("FreeFormNumber","(770) 349-1300").up()
                    .up()
                .ele("WebSite")
                    .ele("URI","http://www.digitalinsight.mint.com").up()
                    .up()
                .ele("Email")
                    .ele("Address","john_doe@digitalinsight.mint.com").up()
                    .up()
                .ele("GivenName","John").up()
                .ele("MiddleName","J").up()
                .ele("FamilyName","Doe").up();
                
                return resOject.json({ response: doc.toString() });
    }catch(err){
        log.error("Error occurred while creating wsdl", err);
    }
};