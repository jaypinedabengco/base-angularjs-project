'use strict';
(function(){

	angular
        .module('app.service.module')
        .service('routeResolveService', RouteResolveService);

    ///////

    /**
     * 
     */
    RouteResolveService.$inject = [
        '$q', '$location', 
        'app.authentication.dataservice'
    ];
    function RouteResolveService(
        $q, $location, 
        authenticationDataservice
    ){

        var services = {
            preload : preload, 
            logged_in : logged_in, 
            not_logged_in : not_logged_in
        };

        return services;

        //////

        /**
         * 
         */
        function preload(){
            var resolve = {

            }
        }

        /**
         * 
         */
        function logged_in(){

            var resolve = {
                is_logged_in : _isLoggedIn()
            }

            return resolve;
            
        }

        /**
         * 
         */
        function not_logged_in(){
            var resolve = {
                is_logged_in : _isNotLoggedIn()
            }

            return resolve;            
        }

        /**
         * 
         */
        function _isLoggedIn(){
            return authenticationDataservice.isLoggedIn()
                .then()
                .catch(function(err){
                    console.log('not logged in, redirecting to login page');
                    $location.path('/login');
                    console.log(err);
                });
        }

        /**
         * 
         */
        function _isNotLoggedIn(){

            return authenticationDataservice.isNotLoggedIn()
                .then()
                .catch(function(err){
                    $location.path('/dashboard');
            });
            
        }        


    }
   

})();