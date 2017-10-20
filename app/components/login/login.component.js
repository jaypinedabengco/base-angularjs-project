'use strict';
(function () {
	angular
		.module('app.component.module')
		.component('login', {
			templateUrl: 'components/login/login.component.html',
			controller: ComponentController
		});

		/////

		ComponentController.$inject = [
		];

		function ComponentController(
		) {

			var vm = this;


			//functions

			//on load
			vm.$onInit = activate;

			return;

			function activate(){
			}

			/**
			 * 
			 */
			function login(){				
			}
		}		

})();