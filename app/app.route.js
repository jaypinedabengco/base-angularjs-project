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
       * ROUTES
       */
      var RESOLVES = {
        is_logged_in : {
          resolve : ['routeResolveService', function(routeResolveService){
            return routeResolveService.logged_in();
          }]
        }, 
        not_logged_in : {
          resolve: ['routeResolveService', function(routeResolveService){
            return routeResolveService.not_logged_in();
          }]
        }
      }

      ////////////

      //Routing
      $locationProvider.hashPrefix('!');
      $routeProvider.        
        when('/', {
            templateUrl: 'views/login.view.html'                    
        })
        .when('/login', {
            templateUrl: 'views/login.view.html', 
            resolve: RESOLVES.not_logged_in
        })
        .when('/404', {
          templateUrl : 'views/404.view.html'                  
        })
        .when('/dashboard', {
          templateUrl : 'views/dashboard.view.html', 
          resolve: RESOLVES.is_logged_in
        })
        .otherwise('/404');
    }    

})();