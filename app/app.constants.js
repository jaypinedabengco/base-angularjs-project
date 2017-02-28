'use strict';
(function(){

    /**********************************************************
     * CONFIGURATIONS
     * 
     * Setting Project specific configurations 
     * based on url
     *********************************************************/
    var _configs = {
        env : 'dev',
        version : '1.0.0',
    };

    var _api_configs = {
        sample_api_url : 'https://jsonplaceholder.typicode.com'
    }

    /**********************************************************
     * Update Config based on environment
     * to get run (windows.location.hostname) on dev console 
     *********************************************************/
    var _stage_urls = ['stage.', 'stage1.', 'stage2.'];
    var _prod_urls = ['stage.', 'prod1.', 'prod2.'];

    if ( isOnEnvironment(_stage_urls) ){
        _configs.env = 'stage';
        _api_configs.sample_api_url = "stage.com/";
    } else if ( isOnEnvironment(_prod_urls) ){
        _configs.env = 'prod';
        _api_configs.sample_api_url = "prod.com/";
    } 

    /****************************************
     * Checker if config on urls
     *****************************************/
    function isOnEnvironment(_target_urls){
        var _current_url = window.location.hostname;
        for ( var i in _target_urls ){
            if ( _current_url.indexOf(_target_urls[i]) == 0 )
                return true;
        }
        return false;
    }

    /****************************************
     * ADD configuration to app
     *****************************************/
    angular
        .module('app')
        .constant('appConfig', _configs)
        .constant('appAPIConfig', _api_configs);
    //////////////    


})();