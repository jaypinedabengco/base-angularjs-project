'use strict';
(function(){

    /**
     * App
     */
    angular
        .module('app', [   
            'ngRoute',
            'ngMaterial',
            
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

