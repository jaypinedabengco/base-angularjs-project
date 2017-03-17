'use strict';

/*
* Navigation Services
*
*/
(function(){
  angular.module('app.service.module')
        .service('nsNotifyBeforeUnload', ['$window', nsNotifyBeforeUnloadService])
        .factory('nsNavigationService', ['$route', nsNavigationService])
        .factory('nsFormOnLeaveNotifyService', [nsFormOnLeaveNotifyService])
        ;

    //////////

    /************************************************************************
     * nsNotifyBeforeUnload
     *  service used to notify when page is reloaded
     * 
     * Services :
     *  - register(message_on_leave) 
     *      * register component that will trigger when leaving page
     *  - unregister()
     *      * remove registration, will not show prompt
     *************************************************************************/
    function nsNotifyBeforeUnloadService($window){

        var message_on_leave = "";
        var show_on_leave = false;

        var is_initialized = false;

        var services = {
            register : register,
            unregister : unregister
        };

        return services;

        ///////

        // Unable to change message
        // http://stackoverflow.com/questions/37782104/javascript-onbeforeunload-not-showing-custom-message
        function register(_message_on_leave){
            message_on_leave = _message_on_leave;
            show_on_leave = true;
            if ( !is_initialized )
                initialize();
        }

        function unregister(){
            show_on_leave = false;
        }

        function initialize(){
            window.onbeforeunload = function(){
                if ( show_on_leave ){
                    if (!message_on_leave || message_on_leave == "")
                        return true;
                    return message_on_leave;
                }
            }
            is_initialized = true;
        }
    }
    /** -- END -- **/

    /**
     * 
     */
    function nsNavigationService($route){
		return {
			goBack : function(){
				window.history.back();
			},
			goTo : function(target){
				if(target.indexOf("#!") == -1)
					window.location = ( "#!" + target );
				else
					window.location = ( target );
			},
			reload : function(){
				$route.reload();
			}
		}
	}

    /**
     * Register a form for automatic before unload when leaving/refreshing a page
     */
    function nsFormOnLeaveNotifyService() {

        var _registered_forms = {};

        //register on leave
        window.onbeforeunload = function(){
            var _has_changes = false;
            var _custom_message = null;
            for ( var key in _registered_forms ){
                var _registered_form = _registered_forms[key];
                if ( _registered_form.has_changes ){
                    _has_changes = true;
                    _custom_message = _registered_form.custom_message;
                }
            }
            if ( _has_changes ){
                return (_custom_message?_custom_message:true);
            }
        }

        var services = {
            register : register,
            reset : reset
        }

        return services;

        ///////


        /**
         * 
         * @param {*} scope 
         * @param {*} formName 
         * @param {*} custom_message 
         */
        function register($scope, formName, custom_message){
            if (_registered_forms[formName]){
                return console.log('form ' + formName + ' is already registered');
            }

            _registered_forms[formName] = {
                scope : $scope, 
                has_changes : false, 
                custom_message : custom_message
            };

            //start a watch
            $scope.$watch(function(scope_on_change){
                if ( scope_on_change[formName] && scope_on_change[formName].$dirty ){
                    _registered_forms[formName].has_changes = true;
                }
            });
        }

        /**
         * 
         * @param {*} formName 
         */
        function reset(formName){
            if ( _registered_forms[formName] ){
                delete _registered_forms[formName];
            }
        }

    }

})();
