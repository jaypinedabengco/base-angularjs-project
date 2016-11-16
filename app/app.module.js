'use strict';
(function(){

    /**
     * CONFIGURATIONS
     * 
     * Setting Project specific configurations 
     * based on url
     */

    //base config ( for dev )
    var _init_app_configs = {
        version : '1.0.0',
        studylane : {
            api_url : '//localhost:3000'
        }
    };


    /**
     * Update Config based on environment 
     */
    var _current_url = window.location.hostname;
    var _stage_url = 'stage.';
    var _prod_url = 'prod.';
   
    if ( _current_url.indexOf(_stage_url) > -1 ){
        /*Stage*/
        _init_app_configs.studylane.api_url = "https://gsp-sl-api-stage.studylane.com";
    }   
    else if ( _current_url.indexOf(_prod_url) > -1 ){
        /*Prod*/ 
        _init_app_configs.studylane.api_url = "https://api-prod.qcapsstudylane.com";
    } 

    /* - END Setting CONFIGURATIONS - */


    /**
     * App
     */
    angular
        .module('app', [   
            'ngRoute',

            'app.sampleFactory.module',
            'app.sampleComponent.module'            
        ])
        .run(initialize)
        .constant('config', _init_app_configs);

    //////////////

    function initialize(){
        console.log('on load!');
    }



})();

