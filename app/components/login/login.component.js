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
			'$location',
			'app.authentication.dataservice'
		];

		function ComponentController(
			$location,
			authenticationDataservice
		) {

			var vm = this;

			//functions
			vm.login = login;

			//on load
			vm.$onInit = activate;

			return;

			function activate(){
			}

			/**
			 * 
			 */
			function login(username, password){				
				authenticationDataservice
					.login(username, password)
					.then(
						function(auth_token){
							console.log('successfully logged in!');
							$location.path('/dashboard');
						}, 
						function(err){
							console.log(err, 'INVALID username and password');
						}
					)
			}
		}		

})();