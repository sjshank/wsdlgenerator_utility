/*
*   
*
*/

'use strict';
angular.module('wsdlApp')
    
    .value('WsdlUrl', 'api/createWsdl.xml')
    
    .factory('wsdlAPI', ['$q', '$http', 'WsdlUrl', 'appConstants',
                 function($q, $http, url, appConstants) {
        
            var wsdlAPIObject = {};
            wsdlAPIObject.generateWSDL = function(data) {
                var deferred = $q.defer();
                $http.post(url).
                    success(function(data, status, headers, config) {
                        if(data.results){
                            deferred.resolve(data.results);
                        }
                    }).
                    error(function(data, status, headers, config) {
                        deferred.reject([data, status, headers, config]);
                    });
                return deferred.promise;
            };
            
        return wsdlAPIObject;
    }]);