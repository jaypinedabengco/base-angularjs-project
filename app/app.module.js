'use strict';
(function(){

    /**
     * App
     */
    angular
        .module('app', [   
            'ngRoute',

            'app.component.module',
            'app.constant.module', 
            'app.service.module',             
            'app.filter.module',               
            'app.dataService.module'
        ])
        .run(initialize);

    //////////////

    function initialize(){
        console.log('on load!');
    }


})();

