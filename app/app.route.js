'use strict';
(function(){

  /*
  * Routes
  */
  angular
    .module('app')
    .config(AppRouteConfig);

    /////

    AppRouteConfig.$inject = ['$locationProvider' ,'$routeProvider']
    function AppRouteConfig($locationProvider, $routeProvider) {

      /**
       * Resolves,
       * used to validate 
       * page access
       */
      const RESOLVES = {
        is_logged_in : { //prevent access to pages that requires login 
          resolve : function(routeResolveService, $location){
            return routeResolveService
              .isLoggedIn()
              .then(function(result){
                return result;
              }, function(err){
                $location.path('/login');
              });
          }
        },
        is_logged_out : { //prevent access to pages that requires login
          resolve : function(routeResolveService, $location){
            return routeResolveService
              .isLoggedOut()
              .then(function(result){
                return result;
              }, function(err){
                $location.path('/login');
              });
          }
        }        
      }

      //Routing
      $locationProvider.hashPrefix('!');
      $routeProvider.        
        when('/', {
            templateUrl: 'views/login.view.html'                    
        })
        .when('/login', {
            templateUrl: 'views/login.view.html'
        })
        .when('/404', {
          templateUrl : 'views/404.view.html'                  
        })
        .otherwise('/404');
    }    

})();