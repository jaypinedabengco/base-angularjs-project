'use strict';
(function(){

     angular
        .module('app.component.module')
        .component('appHeader', {
            templateUrl : 'components/header/header.component.html',
            controller : Controller
    });

    Controller.$inject = ['config'];
    function Controller(config){

        var vm = this;

        activate();

        ///////

        function activate(){
        }

    }

})();