'use strict';
(function(){

	angular
        .module('app.service.module')
        .factory('app.service.navigation.notifyOnLeave', ['$window', '$timeout', 'app.authentication.dataservice', NotifyOnLeaveBuilder])
		;

    ///////

	/**
	 * NotifyOnLeaveBuilder
     * - functions
     *  - getInstance : Return NotifyOnLeave Object
	 */
	function NotifyOnLeaveBuilder($window, $timeout, AuthenticationService){
        
        var _cache = {
            is_logged_in_on_initialize : null, //process on getInstance
            instances : [],
            allow_to_leave : false, 
            onLocationChangeStart_ongoing : false, 
            onLocationChangeSuccess_ongoing : false, 
            onLocationChangeStart_process_count : 0
        }

        return {
            getInstance : getInstance
        }

        /////

        /**
         * Return NotifyOnLeave Object
         * - $scope : (Mandatory)
         * - form_name : (Mandatory, component form name)
         * - on_leave_message : (Optional, message that will appear on browser modal)
         */
        function getInstance($scope, form_name, on_leave_message){

            //reupdate, when used on different components
            _cache.is_logged_in_on_initialize = !!AuthenticationService.getAuthToken();

            var notify_on_leave = new NotifyOnLeave($scope, form_name, on_leave_message);
            _cache.instances.push(notify_on_leave);
            return notify_on_leave; //return same instance
        }


         /**
         * Notify on Leave Object
         */
        function NotifyOnLeave($scope, form_name, on_leave_message){
            
            var _private = this;
                _private.leave_message = (on_leave_message) ? on_leave_message : "Do you want to leave this site? Changes you made may not be saved.";
                _private.$scope = $scope;
                _private.form_name = form_name;
            initialize();

            return {
                on_leave_message : _private.leave_message, 
                reset : resetMonitor, 
                stop : stopMonitor, 
                isFormDirty : isFormDirty
            }

            /**
             * 
             */
            function initialize(){
                
                //bind to global detector
                $window.onbeforeunload = onWindowLeave;

                //bind to global detector
                _private.$scope.$on('$locationChangeStart', onLocationChangeStart);

                //bind to global detector
                _private.$scope.$on('$locationChangeSuccess', onLocationChangeSuccess);

            }

            /**
             * 
             */
            function isFormDirty(){
                var form =  _private.$scope[_private.form_name];
                return form.$dirty;
            }

            /**
             * Stop monitoring, should delete all registered process
             */
            function stopMonitor(){
                window.onbeforeunload = null;
                _cache.allow_to_leave = true;
            }

            /**
             * Make form clean again :)
             */
            function resetMonitor(){
                var form = _private.$scope[_private.form_name];
                form.$setPristine();//clean                
            }

        }

        function onWindowLeave(event){
            
            //logged out or logged in
            if ( _cache.is_logged_in_on_initialize != (!!AuthenticationService.getAuthToken()) ){
                _cache.allow_to_leave = true;
            }

            var _dirty_instances = getDirtyInstances();
            if ( _dirty_instances.length > 0 && !_cache.allow_to_leave){
                var _dirty_instance = _dirty_instances[0]; //get first
                var on_leave_message = _dirty_instance.on_leave_message;
                return on_leave_message;
            }
            
        }

         /**
         * 
         */
        function onLocationChangeStart(event){
            
            //logged out or logged in
            if ( _cache.is_logged_in_on_initialize != (!!AuthenticationService.getAuthToken()) ){
                _cache.allow_to_leave = true;
            }

            //count on change process request, 
            //should only allow 1 process per onLocation change start         
            _cache.onLocationChangeStart_process_count++;
            if ( _cache.onLocationChangeStart_ongoing ){
                //will reset once all instances are processed
                if ( _cache.onLocationChangeStart_process_count >= _cache.instances.length ){
                    _cache.onLocationChangeStart_process_count = 0;
                    _cache.onLocationChangeStart_ongoing = false;
                } else {
                    return;
                }
            }

            _cache.onLocationChangeStart_ongoing = true;

            var _dirty_instances = getDirtyInstances();
            if ( _dirty_instances.length > 0 && !_cache.allow_to_leave){

                var _dirty_instance = _dirty_instances[0]; //get first

                //Build confirm message here

                var answer = confirm(_dirty_instance.on_leave_message);
                if (!answer) {
                    event.preventDefault();
                }               

            }
            
        }

        /**
         * 
         */
        function onLocationChangeSuccess(event){       

            if ( _cache.onLocationChangeSuccess_ongoing ){
                return;
            }

            //clear
            _cache.onLocationChangeSuccess_ongoing = true;
            resetCacheContent();
            return true;

        }

        /**
         * 
         */
        function resetCacheContent(){
            _cache.instances = [];
            _cache.allow_to_leave = false;
            _cache.onLocationChangeStart_ongoing = false;
            _cache.onLocationChangeSuccess_ongoing = false;
            _cache.onLocationChangeStart_process_count = 0;      
            _cache.is_logged_in_on_initialize = (!!AuthenticationService.getAuthToken());
            $window.onbeforeunload = null;      
        }

        /**
         * Instances with dirty forms
         */
        function getDirtyInstances(){
            var _dirty_instances = [];
            
            _cache.instances.forEach(function(_instance){
                if ( _instance.isFormDirty() ){
                    _dirty_instances.push(_instance);
                }
            });

            return _dirty_instances;    
        }
    }

})();