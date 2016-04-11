# SOAP-WSDL Generator Web Portal

A MEAN Stack based web portal to generate draft version of SOAP-WSDL. Grab WSDL and save in your pocket.

Programming Language :

    1.JavaScript

Web/Application Server :

    1.Nodejs

Frameworks :

    1. Expressjs - server side framework
    2. Angularjs - client side framework
    
Libraries : 

    1. grunt - Automatiom task manager
    2. xmlBuilder - For building XML based on user input json
    3. bluebird - For writing Promises in order to avoid callback heck
    4. debug/log4js - For logging info/error.
    5. mongoose - mongodb connection, datamanipualtion for Nodejs/Expressjs
    6. ng-dialog - Rendering popus
    7. angular-route - angular routing
    8. less - compiling less into css
    
Database :

    1.NoSql - Mongodb

Tools :

    1.SublimeText2
    2.Microsoft Visual Studio Code
    
Steps to follow for running app :

    1. install Nodejs from here https://nodejs.org/en/ and make node env up. This will automatically install NPM package in your system.
    2. Install mongodb from here https://www.mongodb.org and make it up. No need to create new db for this sample. It will             create by own.
    3. Install Python 2.7+ version from here https://www.python.org/download/releases/2.7/
    4. Run 'npm install' on 'package.json'. This will create new folder 'node_modules' inside same directory where you can see       all the mentioned dependencies inside 'package.json' will gets installed.
    5. Run 'grunt less' for compiling style.less into style.css
    6. Run either 'grunt' or 'node app.js' over root directory. 'grunt' command will execute all the task mentioned inside           'gruntfile.js'.
    
    Hit "localhost:4000" to see running application
