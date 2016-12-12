'use strict';
(function(){

     angular
        .module('app.sampleComponent.module')
        .component('sample', {
            templateUrl : 'components/sample/sample.component.html',
            bindings: {
               resolve: '<'
            },
            controller : Controller
    });

    Controller.$inject = ['sampleService', '$scope', 'config'];
    function Controller(sampleService, $scope, config){

        var vm = this;

        console.log('resolve', vm);

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