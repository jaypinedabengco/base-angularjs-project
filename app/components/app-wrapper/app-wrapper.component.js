'use strict';
(function () {
	angular
		.module('app.component.module')
		.component('appWrapper', {
			templateUrl: 'components/app-wrapper/app-wrapper.component.html',          
            transclude: true,            
			controller: ComponentController
		});

		/////

		ComponentController.$inject = [
        ];

		function ComponentController(
		) {

			var vm = this;
        
			//on load
			vm.$onInit = activate;

			return;

			function activate(){     
			}

		}		

})();