'use strict';

/**************************************
 * SET Global Configurations and Constants
 *  - auto update based on environment
 *************************************/
(function () {

    //app 
    var _app_configs = {
        version: '1.0',
        env: 'local',
    };

    //api
    var _api_configs = {
        url : 'https://gsp-sl-api-dev.studylane.com'
    }

    //ATTACH constants to project
    angular
        .module('app.constant.module')
        .constant('app.config.build', _app_configs)
        .constant('app.config.api', _api_configs);

})();