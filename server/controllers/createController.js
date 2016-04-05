/*
*	module for calculating distance between 2 geo-location and retreive all stores based on zipcode
*/
'use strict';

const log4js = require('log4js'),
      Promise = require('bluebird'),
      log = log4js.getLogger("createController"),
      fs = require('fs'),
      constants = require('../utils/appConstants'),
      xmlDocHelper = require('../helpers/xmlDocHelper'),
      xml2js = Promise.promisifyAll(require('xml2js')),
      parseString = xml2js.parseStringAsync;
      
//generate wsdl
exports.createWsdl = function(reqObject, resObject) {
    log.debug("******Create WSDL Starts******");
    try{
                var getWSDLFile = function(){
                      var result  = xmlDocHelper.buildXMLDoc(reqObject);
                      return new Promise(function(resolve, reject){
                          parseString(result)
                            .then(function(jsonObj){
                                var build = new xml2js.Builder();
                                return build.buildObject(jsonObj);
                            })
                            .then(function(xmlContent){
                                return fs.writeFile(constants.WSDL_FILE_LOC, xmlContent);        
                            })
                            .then(function(f){
                                return fs.createReadStream(constants.WSDL_FILE_LOC);     
                            })
                            .then(function(fileStream){
                                resolve(fileStream);
                            })
                            .catch(function(err){
                                log.error("Error while sending filestream ", err);
                                resObject.json({errMsg : constants.WSDL_GENERATE_FAILED});
                            });
                      });  
                };
                        
                 (function(){
                            getWSDLFile()
                                .then(function(fileStream){
                                    resObject.setHeader('Content-disposition', 'attachment; filename=' + constants.FILENAME);
                                    resObject.setHeader('Content-type', "text/wsdl");  
                                    fileStream.pipe(resObject);
                                })
                                .catch(function(err){
                                    log.error("Error while sending filestream ", err);
                                    resObject.json({errMsg : constants.WSDL_GENERATE_FAILED});
                                });
                 })();
   
    }catch(err){
        log.error("Error occurred while creating wsdl", err);
        resObject.json({errMsg : constants.SERVICE_ERROR});
    }
};