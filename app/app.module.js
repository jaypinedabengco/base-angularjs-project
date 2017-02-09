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
        .run(initialize);

    //////////////

    function initialize(){
        console.log('on load!');
    }


})();

