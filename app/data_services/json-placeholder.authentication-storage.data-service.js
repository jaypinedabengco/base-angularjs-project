'use strict';
(function(){

     angular
        .module('app.dataService.module')
        .factory('dataService.jsonPlaceHolder.authenticationStorage', Service);

    /**
     * Authentication Storage
     */
    Service.$inject = ['$q', '$cookies'];
    function Service($q, $cookies){

        var _token_id = 'jsonplaceholder-auth-token-container-v1.0';
        var _expire_date = new Date();
            _expire_date.setDate(_expire_date.getDate() + 1); //1 day

        var _cookie_options = {
            path : '/', 
            expires : _expire_date
        }

        var services = {
            getAuthToken: getAuthToken,
            storeAuthToken : storeAuthToken,
            deleteAuthToken : deleteAuthToken
        }
        
        return services;
        
        //////////

        /**
         * 
         */
        function getAuthToken(){
             var _deferred = $q.defer();

             var _token = $cookies.getObject(_token_id);
             if ( _token ) {
                 //do something with retrieved token?
                _deferred.resolve(_token);
             } else {
                 _deferred.reject('token not found');
             }
             
             return _deferred.promise;
        }

        /**
         * 
         */
        function storeAuthToken(token){
            var _deferred = $q.defer();            
            $cookies.putObject(_token_id, token, _cookie_options);           
            _deferred.resolve(token);
            return _deferred.promise; 
        }

        /**
         * 
         */
        function deleteAuthToken(){
            var _deferred = $q.defer();      
            $cookies.remove(_token_id, _cookie_options);           
            _deferred.resolve(true);
            return _deferred.promise; 
        }

    }

})();