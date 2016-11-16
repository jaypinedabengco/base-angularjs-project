'use strict';
(function(){

     angular
        .module('app.sampleComponent.module')
        .component('sample', {
            templateUrl : 'components/sample/sample.component.html',
            bindings: {
                loggedUserInfo: '<',
                sampleServiceValue: '<'
            },
            controller : Controller
    });

    Controller.$inject = ['sampleService', '$scope', 'config'];
    function Controller(sampleService, $scope, config){

        var vm = this;

        console.log('config',config);

        activate();

        function activate(){
           console.log('sampleComponent', vm);

           sampleService.samplePromise('hello').then(function(content){
               console.log('hey!', content);
           }).catch(function(error){
               console.log('fail', error);
           })
        }

    }

})();