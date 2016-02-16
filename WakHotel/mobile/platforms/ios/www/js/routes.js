angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
      
        
    .state('wakHotelMobile', {
      url: '/login',
      templateUrl: 'templates/wakHotelMobile.html',
      controller: 'wakHotelMobileCtrl'
    })
        
      
    
      
        
    .state('tabsController.profile', {
      url: '/page9',
      views: {
        'tab4': {
          templateUrl: 'templates/profile.html',
          controller: 'profileCtrl'
        }
      }
    })
        
      
    
      
        
    .state('tabsController.booking', {
      url: '/page10',
      views: {
        'tab5': {
          templateUrl: 'templates/booking.html',
          controller: 'bookingCtrl'
        }
      }
    })
        
      
    
      
    .state('tabsController', {
      url: '/page8',
      abstract:true,
      templateUrl: 'templates/tabsController.html'
    })
      
    ;

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');

});