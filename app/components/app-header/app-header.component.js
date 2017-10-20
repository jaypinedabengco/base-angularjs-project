'use strict';
(function () {
	angular
		.module('app.component.module')
		.component('appHeader', {
			templateUrl: 'components/app-header/app-header.component.html',
			controller: ComponentController
		});

		/////

		ComponentController.$inject = [
        ];

		function ComponentController(
          
		) {

			var vm = this;

            //variables
		
            //scope events
            
			//on load
			vm.$onInit = activate;

			return;

            /////

			function activate(){
			}


		}		

})();