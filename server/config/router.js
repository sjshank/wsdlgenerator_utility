/*
*	Routing configuration file
*/
'use strict';
var express = require("express"),
    createCtrl = require("../controllers/createController.js"),
    router = express.Router();

router.route('/createWsdl.xml')
    .post(function(req, res) {
        createCtrl.createWsdl(req, res);
    });
    
module.exports = router;