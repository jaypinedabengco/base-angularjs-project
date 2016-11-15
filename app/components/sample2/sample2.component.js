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

    Controller.$inject = ['sampleApiService'];
    function Controller(sampleApiService){

        var vm = this;

        vm.countries = [];

        activate();

        function activate(){
           console.log(vm);

           sampleApiService.post('/api/country/get-list-with-current-location').then(function(result){
               console.log(result);
               vm.countries = result.country_list;
           })
        }

    }

})();