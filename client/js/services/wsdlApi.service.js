/*
*   
*
*/

'use strict';
angular.module('wsdlApp')
    .factory('wsdlAPI', ['$q', '$http', 'WsdlUrl', 'appConstants',
                 function($q, $http, url, appConstants) {
        
            var wsdlAPIObject = {};
            wsdlAPIObject.generateWSDL = function(data) {
                var deferred = $q.defer();
                $http.get(url).
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