'use strict';
(function(){

     angular
        .module('app.sampleComponent.module')
        .component('sampleForm', {
            templateUrl : 'components/sampleForm/sampleForm.component.html',
            controller : Controller
    });

    Controller.$inject = ['sampleApiService'];
    function Controller(sampleApiService){

        var vm = this;

        vm.user = {
            countryOfResidenceId : 1
        }
        vm.saveSuccessful = false;
        vm.saving = false;
        vm.countryList = [];

        vm.onSubmit = onSubmit; 

        activate();

        ////////

        function activate(){
            sampleApiService.post('/api/country/get-list-with-current-location').then(function(result) {
                vm.countryList = result.country_list;
            });
        }

        function onSubmit(){
            console.log(vm.user);

            //validations...
            vm.saving = true;
            sampleApiService.post('/api/country/get-list-with-current-location').then(function() {
                console.log('returned');
                vm.saving = false;
                vm.saveSuccessful = true;
                console.log(vm);
            });     
            //save/submit service...
        } 

    }

})();