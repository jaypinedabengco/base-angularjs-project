'use strict';
(function(){

    //try to consider moving to other place
    var _init_app_configs = {
        version : '1.0.0',
        studylane : {
            api_url : '//localhost:3000/'
        }
    };


    /**
     * Update Config based on environment 
     */
    var _stage_url = 'stage.';
    var _prod_url = 'prod.';

    var _current_url = window.location.hostname;
    if ( _current_url.indexOf(_stage_url) > -1 ){
        _init_app_configs.studylane.api_url = "https://stage.api.qcapsstudylane.com/";
    }   
    else if ( _current_url.indexOf(_prod_url) > -1 ){
        _init_app_configs.studylane.api_url = "https://api-prod.qcapsstudylane.com/";
    } 


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

