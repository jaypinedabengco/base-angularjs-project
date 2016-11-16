'use strict';
(function(){
    
    angular
        .module('app.sampleFactory.module')
        .factory('mockApiService', Service);

    Service.$inject = ['$http'];
    function Service($http){

        var _base_url = 'factories/json';
        var _headers = {'Content-Type' : 'application/json'};

        var services = {
            post: post,
            get: get
        }
        
        return services;
        
        //////////

        function post(target_json, data, custom_headers){
            return $http.get(_base_url + target_json).then(successHandler, failHandler).catch(errorHandler);
        }
        
        function get(target_json){
            return $http.get(_base_url + target_json).then(successHandler, failHandler).catch(errorHandler);
        }        

        /**
         * Functions for within the factory scope
         */

        function successHandler(result){
            console.log('success', result);
            return result.data;
        }

        function failHandler(result){
            console.log('fail', result);
            return result;
        }

        function errorHandler(err){
            console.log('error', err);
            return err;
        }


    }

})();