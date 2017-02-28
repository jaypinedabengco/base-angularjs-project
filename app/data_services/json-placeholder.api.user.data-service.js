'use strict';
(function(){

     angular
        .module('app.dataService.module')
        .factory('dataService.jsonPlaceHolder.api.user', Service);

    Service.$inject = [ '$q', 
                        'dataService.jsonPlaceHolder.api', 'dataService.jsonPlaceHolder.authenticationStorage', 
                        'softCacheService'];
    function Service(   $q, 
                        jsonPlaceHolderAPI, authenticationStorage, 
                        softCacheService){

        var _soft_cache = {
            logged_user : 'logged-user-v1.0'
        };

        var services = {
            getUsers: getUsers,
            authenticate : authenticate, 
            isLoggedIn : isLoggedIn,
            getLoggedUserInfo : getLoggedUserInfo
        }
        
        return services;
        
        //////////

        /**
         * 
         */
        function authenticate(username, password){
            var _deferred = $q.defer();

            //simulate login
            jsonPlaceHolderAPI.get('/users')
                .then(function(results){
                    var _logged_user = null;
                    if ( results ){
                        results.forEach(function(user){
                            if ( user.email === username )
                                _logged_user = user;
                        });
                    }
                    
                    if ( _logged_user ){
                        var _auth_token = _logged_user.id;
                        authenticateStorage.storeAuthToken(_auth_token);
                        _deferred.resolve(_auth_token);

                        //soft cache
                        softCacheService.save(_soft_cache.logged_user, _logged_user);
                    } else {
                        _deferred.reject('unable to log in, invalid username or password');
                    }
                }, _deferred.reject);

            return _deferred.promise;            
        }

        /**
         * 
         */
        function getUsers(){
            
            return jsonPlaceHolderAPI.get('/users')
                    .then(function(results){

                        //do extra process when api returns                        
                        if ( results ){
                            results.forEach(function(user){
                                //add randomId??
                                user.randomId = Math.floor(Math.random() * 1000000) + '-' + new Date().getTime();
                            });
                        }

                        return results;
                    });
        }

        /**
         * 
         */
        function isLoggedIn(){
            return authenticationStorage
                .getAuthToken()
                .then(function(token){
                    return token;
                }, function(err){
                    
                });
        }

        /**
         * 
         */
        function getLoggedUserInfo(use_cached_value){
            var _deferred = $q.defer();         


            var _logged_user = null;

            if ( use_cached_value == true )
                _logged_user = softCacheService.get(_soft_cache.logged_user);
            if ( _logged_user ) {
                _deferred.resolve(_logged_user);
            } else {
                
                //simulate get logged user info

            }

            return _deferred.promise;    
        }

    }

})();