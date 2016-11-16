'use strict';
(function(){

     angular
        .module('app.sampleComponent.module')
        .component('sample2', {
            templateUrl : 'components/sample2/sample2.component.html',
            bindings: {
                userInfoDaw: '<'
            },            
            controller : Controller
    });

    Controller.$inject = ['sampleApiService', 'mockApiService'];
    function Controller(sampleApiService, mockApiService){

        var vm = this;

        vm.countries = null;
        vm.courses = null;
        vm.users = null;

        activate();

        function activate(){
           console.log(vm);

           //get countries
           sampleApiService.post('/api/country/get-list-with-current-location').then(function(result){
               vm.countries = result.country_list;
           });

           //get courses
           sampleApiService.post('/api/tile/courses/list').then(function(result){
               vm.courses = result;
           });

           mockApiService.get('/sample-users-list.json').then(function(result){
               vm.users = result;
           });         
        }

    }

})();