'use strict';
(function(){
    
    angular
        .module('app.sampleFactory.module')
        .factory('sampleApiService', Service);

    Service.$inject = ['$http', 'config'];
    function Service($http, config){

        var _base_url = config.studylane.api_url;

        var _headers = {'Content-Type' : 'application/json'};
        var services = {
            post: post,
        }
        
        return services;
        
        //////////

        /**
         * Customized Post
         */
        function post(api, data, custom_headers){
            var _url = _base_url + api;
            var _post_config = {
                headers : _headers
            }

            //if data is empty
            if (!data || data instanceof Object == false) 
                data = {};

            //use custom headers & merge to default headers
            if (!!custom_headers && custom_headers instanceof Object) 
                _post_config.headers = mergeHeaders(_post_config.headers, custom_headers);
            
            return $http.post(_url, data, _post_config)
                    .then(successHandler, failHandler)
                    .catch(errorHandler);
        }

        function successHandler(result){
            console.log('success', result);
            return result.data.reference_data;
        }

        function failHandler(result){
            console.log('fail', result);
            return result;
        }

        function errorHandler(err){
            console.log('error', err);
            return err;
        }

        function mergeHeaders(mainHeaders, customHeaders) {
            var _merge_headers = {};
            for (var i in mainHeaders) 
                _merge_headers[i]=mainHeaders[i];
            for (var i in customHeaders) 
                _merge_headers[i]=customHeaders[i];     
            return _merge_headers;           
        }

    }

})();