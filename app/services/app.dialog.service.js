'use strict';
(function(){

	angular
        .module('app.service.module')
        .factory('app.service.dialog', ['$mdDialog',dialogService]);

    ///////

    /**
     * Dialog Service
     */
    function dialogService($mdDialog){
		return {

			/**
            * - title | String (required)
			* - message | String (required)
			* - callback | (function) returns (boolean, $mdDialog) (required)	

			* - yesLabel | String (optional)	
			* - noLabel | String (optional)
			* - clickOutsideToClose | (boolean) default true (optional)
			* - closeOnConfirm | (boolean) default true (optional)
            */
			confirm : function(content){
				
				if ( typeof content.callback != 'function' )
					throw 'callback is required';

				var clickOutsideToClose = !(content.clickOutsideToClose == false);
				var closeOnConfirm	= !(content.closeOnConfirm == false);

				/**
				 * 
				 * @param {*} scope 
				 * @param {*} mdDialog 
				 */
				function DialogController($scope, $mdDialog){
					//build content
					$scope.title 		= content.title;
					$scope.content 		= content.message;
					$scope.yesLabel 	= (typeof content.yesLabel == 'string')?content.yesLabel:"YES";
					$scope.noLabel 		= (typeof content.noLabel == 'string')?content.noLabel:"NO";					
					$scope.confirm = function(answer){
						$mdDialog.hide(answer);
					}		
				}; 

				$mdDialog.show({
					controller: ['$scope', '$mdDialog', DialogController],
					templateUrl:'/views/templates/confirm-template.html',
					parent: angular.element(document.body),
					clickOutsideToClose:clickOutsideToClose
				}).then(function(answer){
					content.callback(answer, $mdDialog);
				}, function(){
					content.callback(false, $mdDialog);
				});								

			},

			/**************************************************
			* - title | String (required)
			* - message | String (required)
			* - callback | (function) returns ($mdDialog) (optional)

			* - okLabel | String (optional)	
			* - clickOutsideToClose | (boolean) default true (optional),
			* - size : String ('sm' | 'xs')				
			*********************************************************/
			prompt : function(content){

				if ( typeof content.callback != 'function' )
					content.callback = function(){};

				var clickOutsideToClose = !(content.clickOutsideToClose == false);

				/**
				 * 
				 * @param {*} scope 
				 * @param {*} mdDialog 
				 * @param {*} sce 
				 */
				function PromptController($scope, $mdDialog, $sce){

					//build content
					$scope.title 		= content.title;
					$scope.content 		= $sce.trustAsHtml(content.message);
					$scope.okLabel 	= (typeof content.okLabel == 'string')?content.okLabel:"OK";					

					$scope.onClickOk = function(){
						$mdDialog.hide();
					}
										
				}; 

				$mdDialog.show({
					controller: ['$scope', '$mdDialog', '$sce', PromptController],
					templateUrl: '/views/templates/confirm-template.html',
					parent: angular.element(document.body),
					clickOutsideToClose:clickOutsideToClose
				}).then(function(){
					content.callback($mdDialog);
				}, function(){
					content.callback($mdDialog);
				});								

			},
			
            /**************************************************
			* - title | String (required)
			* - message | String (required)
			* - callback | (function) returns ($mdDialog) (optional)

			* - okLabel | String (optional)	
			* - ariaLabel | (String (optional)	
			*********************************************************/
			showAlert : function (title, message, ariaLabel, callback, ok, parent ) {
				$mdDialog.show(
						      $mdDialog.alert()
						        .parent(angular.element(document.querySelector(parent)))
						        .clickOutsideToClose(true)
						        .title(title)
						        .textContent(message)
						        .ariaLabel(ariaLabel)
						        .ok(ok ||'OK')
						        .targetEvent('')
						    ).then(function() {
								if(typeof callback == 'function' )
									callback();
						    });
			},

            /**
             * 
             */
			showAlertWithCustomTemplate : function (title,message,ariaLabel,callback,ok,parent) {
				$mdDialog.show(
						      $mdDialog.alert()
						        .parent(angular.element(document.querySelector(parent)))
						        .clickOutsideToClose(true)
						        .title(title)
						        .textContent(message)
						        .ariaLabel(ariaLabel)
						        .ok(ok ||'OK')
						        .targetEvent('')
						    ).then(function() {
								if(typeof callback == 'function' )
									callback();
						    });
			},

            /**
             * 
             */
			confirmAlert : function(title,message,ariaLabel,callback,ok,cancel,parent){
				$mdDialog.show($mdDialog.confirm({
					onComplete: function afterShowAnimation() {
                        // var $dialog = angular.element(document.querySelector('md-dialog'));
                        // var $actionsSection = $dialog.find('md-dialog-actions');
                        // var $cancelButton = $actionsSection.children()[0];
                        // var $confirmButton = $actionsSection.children()[1];
                        // angular.element($confirmButton).addClass('');
						// angular.element($cancelButton).removeClass('md-primary');
                        // angular.element($cancelButton).addClass('cancel-button');
                    }
				})
                .parent(angular.element(document.querySelector(parent)))
                .title(title)
                .textContent(message)
                .ariaLabel(ariaLabel)
                .targetEvent('')
                .ok(ok || 'YES')
                .cancel(cancel || 'NO')).then(function() {
                            if(typeof callback == 'function' )
                                callback(null,true);
                        }, function() {
                            if(typeof callback == 'function' )
                                callback(true, null);
                        }
                    );
			}
		}
	}        

})();