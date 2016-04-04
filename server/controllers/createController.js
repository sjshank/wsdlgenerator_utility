/*
*	module for calculating distance between 2 geo-location and retreive all stores based on zipcode
*/
'use strict';

const log4js = require('log4js'),
      Promise = require('bluebird'),
      builder = Promise.promisifyAll(require("xmlbuilder")),
      path = require('path'),
      log = log4js.getLogger("createController"),
      file = './server/data/SOAP-WSDL.wsdl',
      fs = require('fs'),
      xml2js = Promise.promisifyAll(require('xml2js')),
      parseString = xml2js.parseStringAsync,
      jstoxml = require('jstoxml');
      
//generate wsdl
exports.createWsdl = function(reqObject, resObject) {
    log.debug("Inside createWsdl methond");
    try{
        var result = "";
        var buildXML = function (){
                return builder.create('wsdl:definitions', {'version': '1.0', 'encoding': 'UTF-8'})
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
        };
                
                var getWSDLFile = function(){
                      result  = buildXML();
                      return new Promise(function(resolve, reject){
                          parseString(result.toString())
                            .then(function(jsonObj){
                                var build = new xml2js.Builder();
                                return build.buildObject(jsonObj);
                            })
                            .then(function(xmlContent){
                                    return fs.writeFile(file, xmlContent);        
                            })
                            .then(function(f){
                                   return fs.createReadStream(file);     
                            })
                            .then(function(fileStream){
                                resolve(fileStream);
                            })
                            .catch(function(err){
                                log.error( err);
                                resObject.json({errMsg : "Failed to generate WSDL. Please try after sometime."});
                            });
                      });  
                };
                        
                 (function(){
                            getWSDLFile()
                                .then(function(fileStream){
                                    const filename = path.basename(file);
                                    resObject.setHeader('Content-disposition', 'attachment; filename=' + filename);
                                    resObject.setHeader('Content-type', "text/xml");  
                                    fileStream.pipe(resObject);
                                })
                                .catch(function(err){
                                    log.error( err);
                                    resObject.json({errMsg : "Failed to generate WSDL. Please try after sometime."});
                                });
                 })();
   
    }catch(err){
        log.error("Error occurred while creating wsdl", err);
        resObject.json({errMsg : "Something went wrong in backend. We are working hard to resolve."});
    }
};