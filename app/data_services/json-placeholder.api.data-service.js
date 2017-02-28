'use strict';
/**
 * Uses https://jsonplaceholder.typicode.com Sample APIs
 */
(function(){

     angular
        .module('app.dataService.module')
        .factory('dataService.jsonPlaceHolder.api', Service);

    Service.$inject = ['$http', '$q', 'app.constants.appConfigs'];
    function Service($http, $q, appConfigs){

        var base_url = appConfigs.api.json_placeholder_api_url;
        var base_headers = {'Content-Type' : 'application/json'};

        var services = {
            post: post,
            get : get
        }
        
        return services;
        
        //////////

        /**
         * 
         */
        function post(_api, _data, _custom_headers){
            var _deffered   = $q.defer();
            var api_url     = base_url + _api;
            var options     = {};

            //if data is empty
            _data = (!_data || _data instanceof Object == false)?{}:_data;

            //use custom headers & merge to default headers
             options.headers =  mergeHeaders(_base_headers, _custom_headers);

            $http
                .post(api_url, _data, options)
                .then(_deffered.resolve, _deffered.reject)
                .catch(_deffered.reject);

            return _deffered.promise;
        }

        /**
         * 
         */
        function get(_api, _custom_headers){
            var _deffered   = $q.defer();            
            var api_url     = base_url + _api;
            var _options    = {};

            //use custom headers & merge to default headers
             _options.headers =  mergeHeaders(_base_headers, _custom_headers);
            
            $http
                .get(api_url, _options)
                .then(_deffered.resolve, _deffered.reject)
                .catch(_deffered.reject);                ;
            return _deffered.promise;
        }        

        /**
         * Merge Headers
         */
        function mergeHeaders(_base_headers, _custom_headers) {
            var _merge_headers = {};

            if ( _base_headers ) {
                for (var i in _base_headers) 
                    _merge_headers[i]=_base_headers[i];                
            }

            if ( custom_headers ){
                for (var i in custom_headers) 
                    _merge_headers[i]=custom_headers[i];   
            }
            return _merge_headers;           
        }

    }

})();