'use strict';
(function(){

    angular
        .module('app')
        .config(Config);

    /* - test members DELETE when not used - */
    var _is_user_logged_in = true;
    /*- end test members -*/

    Config.$inject = ['$locationProvider', '$routeProvider'];
    function Config($locationProvider, $routeProvider){
        $locationProvider.hashPrefix('!');

        $routeProvider
            // .when('/', {
            //     templateUrl: 'views/home.view.html'
            // })
            // .when('/home', {
            //     templateUrl: 'views/home.view.html'
            // })
            // .when('/login', {
            //     templateUrl: 'views/login.view.html',
            // })            
            // .when('/sample', {
            //     template: '<sample resolve="$resolve" logged-user-info="$resolve.loggedUserInfo" sample-service-value="$resolve.sampleServiceResult"></sample>',
            //     resolve : {
            //         loggedUserInfo : getLoggedUserInfo
            //     }
            // })
            // .when('/sampleForm', {
            //     template: '<sample-form></sample-form>'
            // })
            // .when('/fancySampleForm', {
            //     templateUrl: 'views/sampleForm.view.html'
            // })            
            // .when('/404', {
            //     templateUrl: 'views/404.view.html'
            // })
            // .otherwise('/404');

    }

    ////////////


    /**
     * Check in resolve if user is logged in
     * if logged in then get info
     * if not, then redirect to login
     * 
     */
    getLoggedUserInfo.$inject = ['$location','$q', 'sampleService'];
    function getLoggedUserInfo($location, $q, sampleService) {               
    }    

})();