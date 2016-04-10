/*
*   
*
*/

'use strict';
angular.module('wsdlApp')
    
    .value('WsdlUrl', 'api/createWsdl.xml')
    
    .factory('wsdlAPI', ['$q', '$http', 'WsdlUrl', 'appConstants',
                 function($q, $http, url, appConstants) {
        
            var wsdlAPI = {};
            wsdlAPI.generateWSDL = function(data) {
                var deferred = $q.defer();
                $http.post(url, data).
                    success(function(data, status, headers, config) {
                        if(data.results){
                            deferred.resolve(data.results);
                        }
                    }).
                    error(function(data, status, headers, config) {
                        deferred.reject(appConstants.SERVICE_ERROR);
                    });
                return deferred.promise;
            };
            
        return wsdlAPI;
    }]);