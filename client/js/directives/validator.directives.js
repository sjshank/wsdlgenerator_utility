'use strict';

angular.module('wsdlApp')

//Directive for validating alphabet inputs
.directive("ngvalidateCharacter", ['$log', 'appConstants', function ($log, appConstant) {
    return {
        restrict: "A",
        require: "?ngModel",
        link: function (scope, element, attributes, ngModel) {
                validateInput('ngvalidateCharacter', appConstant.SERVICE_NAME_REG_EX, ngModel);
        }           
    };
}]);

function validateInput(dirName, regEx, ngModel){
    try{
            ngModel.$validators[dirName] = function (val) {
                    if (typeof val === 'undefined' || val === "" || (!regEx.test(val))) {
                        return false;
                    }
                    else{
                        return true;
                    }
                };
    }catch(err){
        $log.error("Error occurred while validating "+ dirName +"content", err);
    }
};