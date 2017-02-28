'use strict';
(function(){
    
    angular
        .module('app.service.module')
        .factory('runIntervalService', Service);

    Service.$inject = ['$q', '$interval'];
    function Service($q, $interval){

        var _running_intervals = {}
        var services = {
            start:start,
            stop:stop,
            stopAll:stopAll
        }
        
        return services;
        
        //////////

        function start(label, function_to_run, interval_in_millis){
            var _deferred = $q.defer();

            if (function_to_run instanceof Function == false) {
                _deferred.reject('should provide function to run');
            } else if ( !label || label == '') {
                _deferred.reject('label is required');
            } else if ( interval_in_millis > 0 == false ) {
                _deferred.reject('should provide intervals');
            } else {
                try {
                    var _running_interval = _running_intervals[label];
                    if ( !_running_interval ) {

                        //record
                        _running_intervals[label] = {
                            label : label,
                            interval_in_millis : interval_in_millis,
                            registered_interval : $interval(function_to_run, interval_in_millis) //register to interval
                        };
                        _deferred.resolve(label + ' is now running every ' + interval_in_millis + ' milliseconds');
                    } else { //already running
                        _deferred.resolve(label + ' is already running for every ' + _running_interval.interval_in_millis + ' milliseconds');
                    }
                } catch (e){
                    _deferred.reject(e);
                }
            }
            return _deferred.promise;
        }

        function stop(label){
            var _deferred = $q.defer();
            var _running_interval = _running_intervals[label];

            try {
                if ( _running_interval ){
                    $interval.cancel(_running_interval.registered_interval);
                    delete _running_intervals[label];
                    _deferred.resolve(label + ' is cancelled');
                } else {
                    _deferred.resolve(label + ' not registered, it maybe deleted or not registered in the first place');
                }
            } catch ( e ) {
                 _deferred.reject(e);
            }

            return _deferred.promise;
        }

        function stopAll(){
            var _deferred = $q.defer();
            for ( var i in _running_intervals ){
                var _label = _running_intervals[i].label;
                //logs only
                stop(_label)
                    .then(
                        function(){console.log('cleared interval : ' + _label)},
                        function(){console.log('failed clear interval : ' + _label)}
                    );
            }
            _deferred.resolve('deleted');
            return _deferred.promise;            
        }
      

    }

})();