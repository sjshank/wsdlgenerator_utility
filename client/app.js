/*
*	app.js for initializing angular module container.
*   Defining routes, value and rootscope.
*/

'use strict';

angular.module('wsdlApp', ['app.routes', 'app.config', 'ngDialog', 'ui.bootstrap', 'ngFileSaver'])
       .config(['ngDialogProvider', function (ngDialogProvider) {
        ngDialogProvider.setDefaults({
            className: 'ngdialog-theme-default',
            showClose: true,
            closeByDocument: true,
            closeByEscape: true,
            overlay: true,
            closeByNavigation: true
        });
    }]);