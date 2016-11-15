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
            .when('/', {
                templateUrl: 'views/home.view.html'
            })
            .when('/home', {
                templateUrl: 'views/home.view.html'
            })
            .when('/login', {
                templateUrl: 'views/login.view.html',
            })            
            .when('/sample', {
                template: '<sample logged-user-info="$resolve.loggedUserInfo" sample-service-value="$resolve.sampleServiceResult"></sample>',
                resolve : {
                    loggedUserInfo : getLoggedUserInfo,
                    sampleServiceResult : sampleServiceResult
                }
            })
            .when('/404', {
                templateUrl: 'views/404.view.html'
            })
            .otherwise('/404');

    }

    ////////////


    /*
        Creating a sample service that will be used on resolves
    */
    sampleServiceResult.$inject = ['sampleService'];
    function sampleServiceResult(sampleService) {
        return sampleService.samplePromise('then');
    }

    /**
     * Check in resolve if user is logged in
     * if logged in then get info
     * if not, then redirect to login
     * 
     */
    getLoggedUserInfo.$inject = ['$location','$q', 'sampleService'];
    function getLoggedUserInfo($location, $q, sampleService) {

        var deferred = $q.defer();

        sampleService.getLoggedInUserInfo(_is_user_logged_in).then(function(data){ 
            deferred.resolve(data);
        }).catch(function(error){
            console.log(error);
            deferred.reject(false);
            return $location.path('/login');
        });

        return deferred.promise;                         
    }    

})();