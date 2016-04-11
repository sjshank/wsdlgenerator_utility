/*
*	app.js for initializing angular module container.
*   Defining routes, value and rootscope.
*/

'use strict';

angular.module('wsdlApp', ['app.routes', 'app.config', 'ngDialog', 'ui.bootstrap', 'ngFileSaver']);