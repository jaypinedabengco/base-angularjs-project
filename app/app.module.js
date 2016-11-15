'use strict';
(function(){

    //Project Configurations
    var _app_configs = {
        //version
        version : '1.0.0',
        api_main : '//localhost:3000/',
    };

    // Define the `qcapsApp` module
    angular.module('baseApp', [      
    ])
    .run(initialize)
    .constant('appConfiguration', _app_configs);

})();

