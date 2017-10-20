'use strict';
(function(){

	angular
        .module('app.service.module')
        .service('routeResolveService', RouteResolveService);

    ///////

    /**
     * 
     */
    RouteResolveService.$inject = ['$q', '$location', 'app.authentication.dataservice']
    function RouteResolveService($q, $location, authenticationDataService){

        var services = {
            isLoggedIn : isLoggedIn,
            isLoggedOut : isLoggedOut
        };

        return services;

        //////

        /**
         * 
         */
        function isLoggedIn(){
            return authenticationDataService.isLoggedIn();
        }

        /**
         * 
         */
        function isLoggedOut(){
            var defer = $q.defer();
            authenticationDataService
                .isLoggedIn()
                .then(
                    function(is_logged_in){
                        if ( !is_logged_in ){
                            defer.resolve(true);
                        } else {
                            defer.reject(true);
                        }
                    }, 
                    function(err){
                        defer.resolve(true);
                    }
                );

            return defer.promise;        
        }

    }
   

})();