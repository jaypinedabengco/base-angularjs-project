'use strict';
(function(){

    angular
        .module('app.dataservice.module')
        .service('app.api.dataservice', ApiDataService);

	/**
	 * 
	 */
	ApiDataService.$inject = ['$http', '$q'];
	function ApiDataService($http, $q){
		
		const MOCK_DATA_LOCATION = '/dataservices/mock_json';

		var base_url = '';

		var services = {	
			post : post,
			get : get, 
			mock_get : mock_get, 
			mock_post : mock_post
		}

		return services;

		/////

        /**
         * 
         * @param {*} api_url 
         * @param {*} data 
         * @param {*} auth_token 
         */
		function post(api_url, data, auth_token){
			return doRequest(api_url, 'POST', data, auth_token);			
		}

        /**
         * 
         * @param {*} api_url 
         * @param {*} auth_token 
         */
		function get(api_url, auth_token){
			return doRequest(api_url, 'GET', {}, auth_token);
		}		

        /**
         * 
         * @param {*} api_url 
         * @param {*} data 
         * @param {*} auth_token 
         */
		function mock_post(file_name, data, auth_token){
			return doMockRequest(MOCK_DATA_LOCATION + file_name, 'POST', data, auth_token);			
		}

        /**
         * 
         * @param {*} api_url 
         * @param {*} auth_token 
         */
		function mock_get(file_name, auth_token){
			return doMockRequest(MOCK_DATA_LOCATION + file_name, 'GET', {}, auth_token);
		}

        /**
         * 
         * @param {*} api_url 
         * @param {*} method 
         * @param {*} data 
         * @param {*} auth_token 
         */
		function doRequest(api_url, method, data, auth_token){

			var _method = (method && method.toLowerCase() == 'post')?'POST':'GET';

            //build options
			var _options = {
				method : _method, 
				url : api_url,
				headers : {
					'Content-Type': 'application/json',
				}, 
				data : data
			};

			if ( auth_token && typeof auth_token == 'string'){
                _options.headers['x-access-token'] = auth_token;
            }				

			var defer = $q.defer();
			$http(_options).then(
				function(response){
					var _response_data = response.data;
					if ( _response_data.success ){
						defer.resolve(_response_data);
					} else {
						defer.reject(_response_data);							
					}	
				}, 
				function(response){
					var _response_data = response.data;
					defer.reject(_response_data);
				}
			);

			return defer.promise;
		}	
		
		/**
		 * 
		 */
		function doMockRequest(api_url, method, data, auth_token){
			var _method = (method && method.toLowerCase() == 'post')?'POST':'GET';
			
			//build options
			var _options = {
				method : _method, 
				url : api_url,
				data : data
			};		

			var defer = $q.defer();
			$http(_options).then(
				function(response){
					var _response_data = response.data;
					if ( _response_data.success ){
						defer.resolve(_response_data);
					} else {
						defer.reject(_response_data);							
					}	
				}, 
				function(response){
					var _response_data = response.data;
					defer.reject(_response_data);
				}
			);

			return defer.promise;
		}
	};	     
    
})();