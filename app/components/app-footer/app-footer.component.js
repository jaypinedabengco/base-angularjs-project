'use strict';
(function () {
	angular
		.module('app.component.module')
		.component('appFooter', {
			templateUrl: 'components/app-footer/app-footer.component.html',
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

            /////

			function activate(){
			}

           
		}		

})();