'use strict';
(function(){

    angular
        .module('app.dataservice.module')
        .service('app.authentication.dataservice', DataService);

	/**
	 * 
	 */
	DataService.$inject = ['$q', '$cookies', 'app.api.dataservice'];
	function DataService($q, $cookies, apiDataService){
        
        var AUTH_COOKIE_NAME = 'auth-token';

        var cookie_options = {
            path: '/'
        }

		var services = {	
            login: login, 
            isLoggedIn: isLoggedIn, 
            isNotLoggedIn: isNotLoggedIn
		}

		return services;

        /////
        
        /**
         * 
         * @param {*} username 
         * @param {*} password 
         */
        function login(username, password){

            return $q(function(resolve, reject) {

                var mock_json = '/authenticate_fail.json';
                if ( password == 'M0use123'){
                    mock_json = '/authenticate_success.json';
                }

                //do mock post
                apiDataService
                    .mock_post(mock_json)
                    .then(
                        function(data) {
                            $cookies.put(AUTH_COOKIE_NAME, data.reference_data, cookie_options); //add auth token to cookie
                            return data.reference_data; //return token
                        }
                    )
                    .then(resolve, reject);

            });
        }

        /**
         * 
         */
        function isLoggedIn(){

            var defer = $q.defer();

            if ( $cookies.get(AUTH_COOKIE_NAME) ){
                 defer.resolve(true);
            } else {
                 defer.reject(false);
            }

            return defer.promise;
       
        }

        /**
         * 
         */
        function isNotLoggedIn(){
            
            var defer = $q.defer();

            if ( !$cookies.get(AUTH_COOKIE_NAME) ){
                defer.resolve(true);
            } else {
                defer.reject(false);
            }

            return defer.promise;
                   
        }        


	};	     
    
})();