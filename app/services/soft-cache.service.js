'use strict';
/**
 * Simple CRUD, save on variable session
 */
(function(){
    
    angular
        .module('app.service.module')
        .factory('softCacheService', Service);

    Service.$inject = [];
    function Service(){

        var container = {};

        var services = {
            save : save,
            get : get,
            remove : remove,
            reset : reset
        }
        
        return services;
        
        /////////
        function save(name, value){
            container[name] = value;
        }

        function get(name){
            return container[name];
        }

        function remove(name){
            delete container[name];
        }

        function reset(){
            container = {};
        }


    }

})();