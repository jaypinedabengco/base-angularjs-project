'use strict';
(function(){

	angular
        .module('app.service.module')
        .factory('app.service.toast', ['$mdToast',toastService]);

    ///////
	
    /**
     * Toast Service
	 *  - Functions
	 * 	 - showTopRight : (show toast on Top Right)
	 * 	 - showTopLeft :  (show toast on Top Left)
	 * 	 - showBottomRight :  (show toast on Bottom Right)
	 * 	 - showBottomLeft :  (show toast on Bottom Left)
     */
    function toastService($mdToast){
		return {
			showTopRight : showTopRight,
			showTopLeft : showTopLeft,
			showBottomRight : showBottomRight,
			showBottomLeft : showBottomLeft,
		}

		/**
		 * content
		 *  - Set content of the toast
		 *      - content.message: Set main message of toast - String
		 *      - content.showClose: show close button or not - Boolean
		 *      - content.closeText: text of close button - String
		 *      - content.delayTime: toast delay time in milliseconds (3000 milliseconds is default) - Integer
		 * @param {*} content 
		 */
		function showTopRight(content) {
		var toastCtrl = ['$scope', '$mdToast', function ($scope, $mdToast) {
			$scope.message = content.message;
			$scope.showClose = content.showClose;
			$scope.closeText = content.closeText || "";
			$scope.closeToast = function () {
				$mdToast
					.hide();
			}
		}];

		$mdToast.show({
			hideDelay: content.delayTime || 3000,
			position: 'top right',
			controller: toastCtrl,
			templateUrl: 'views/templates/toast-template.html'
		});
	}

	/**
	 * content
	 *  - Set content of the toast
	 *      - content.message: Set main message of toast - String
	 *      - content.showClose: show close button or not - Boolean
	 *      - content.closeText: text of close button - String
	 *      - content.delayTime: toast delay time in milliseconds (3000 milliseconds is default) - Integer
	 * @param {*} content 
	 */
	function showTopLeft(content) {
		var toastCtrl = ['$scope', '$mdToast', function ($scope, $mdToast) {
			$scope.message = content.message;
			$scope.showClose = content.showClose;
			$scope.closeText = content.closeText || "";
			$scope.closeToast = function () {
				$mdToast
					.hide();
			}
		}];

		$mdToast.show({
			hideDelay: content.delayTime || 3000,
			position: 'top left',
			controller: toastCtrl,
			templateUrl: 'views/templates/toast-template.html'
		});
	}
	
	/**
	 * content
	 *  - Set content of the toast
	 *      - content.message: Set main message of toast - String
	 *      - content.showClose: show close button or not - Boolean
	 *      - content.closeText: text of close button - String
	 *      - content.delayTime: toast delay time in milliseconds (3000 milliseconds is default) - Integer
	 * @param {*} content 
	 */
	function showBottomRight(content) {
		var toastCtrl = ['$scope', '$mdToast', function ($scope, $mdToast) {
			$scope.message = content.message;
			$scope.showClose = content.showClose;
			$scope.closeText = content.closeText || "";
			$scope.closeToast = function () {
				$mdToast
					.hide();
			}
		}];

		$mdToast.show({
			hideDelay: content.delayTime || 3000,
			position: 'bottom right',
			controller: toastCtrl,
			templateUrl: 'views/templates/toast-template.html'
		});
	}

	/**
	 * content
	 *  - Set content of the toast
	 *      - content.message: Set main message of toast - String
	 *      - content.showClose: show close button or not - Boolean
	 *      - content.closeText: text of close button - String
	 *      - content.delayTime: toast delay time in milliseconds (3000 milliseconds is default) - Integer
	 * @param {*} content 
	 */
	function showBottomLeft(content) {
		var toastCtrl = ['$scope', '$mdToast', function ($scope, $mdToast) {
			$scope.message = content.message;
			$scope.showClose = content.showClose;
			$scope.closeText = content.closeText || "";
			$scope.closeToast = function () {
				$mdToast
					.hide();
			}
		}];

		$mdToast.show({
			hideDelay: content.delayTime || 3000,
			position: 'bottom left',
			controller: toastCtrl,
			templateUrl: 'views/templates/toast-template.html'
		});
	}
} 

})();