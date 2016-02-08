/**
 * Created by stephanegarnier on 02/04/2014.
 */

'use strict';

var wakHotel = angular.module('WakHotel', [
    'ui.router',
    'ui.validate',
    'ui.bootstrap',
    'dialogs.main',
    'ngImgCrop',
    'wakanda',
]);

wakHotel.config(['$stateProvider', '$urlRouterProvider','$locationProvider', function ($stateProvider, $urlRouterProvider, $locationProvider) {

    //$locationProvider.html5Mode(true).hashPrefix('!');
    $urlRouterProvider.otherwise("/");

    $stateProvider
        .state('search', {
            url: '/',
            templateUrl: 'views/search.html',
            controller: 'searchController',
            resolve: {

            }
        });
        $stateProvider
            .state('book', {
                url: '/book/:id/:start/:end',
                templateUrl: 'views/book.html',
                controller: 'bookController',
                resolve: {

                }
            });

            $stateProvider
                .state('book_room', {
                    url: '/book_room/:id/:start/:end',
                    templateUrl: 'views/book_room.html',
                    controller: 'bookController',
                    resolve: {

                    }
                });

        $stateProvider
        .state('create_account', {
            url: '/create_account',
            templateUrl: 'views/create_account.html',
            controller: 'createAccountController',
            resolve: {

            }
        });

        $stateProvider
        .state('login', {
            url: '/login',
            templateUrl: 'views/login.html',
            controller: 'loginController',
            resolve: {

            }
        });

        $stateProvider
            .state('profile', {
                abstract:true,
                url: '/profile',
                templateUrl: 'views/profile.html',
                controller: 'profileController',
                resolve: {
                  userId: ['$q','$wakanda', function ($q, $wakanda){
                    var deferred = $q.defer();
                    $wakanda.$currentUser().then(function(user){
                        console.log(user);
                        if (user.result === null) {
                          deferred.reject(false);
                        } else {
                          deferred.resolve(user.result.ID);
                        }
                    });
                    return deferred.promise;
                  }]
                }
            });
        $stateProvider
            .state('profile.booking', {
                url: '/booking',
                templateUrl: 'views/profile.booking.html',
                controller: 'profileBookingController',
                resolve: {

                }
            });
        $stateProvider
            .state('profile.account', {
                url: '/account',
                templateUrl: 'views/profile.account.html',
                controller: 'profileAccountController',
                resolve: {

                }
            });

}]).
    run(['$rootScope', '$state', '$wakanda', function ($rootScope, $state, $wakanda) {
      $rootScope.$on('$stateChangeError', function (e, curr, prev) {
          if (curr.name != "login") {
              $state.go('login');
          }
      });
}]).
    service('WakandaManager', function($q, $wakanda) {
    var _this = this;
    var initPromise = $wakanda.init();
    this.$wakanda = $wakanda;

    this.ready = function() {
      var deferred = $q.defer();

      initPromise
        .then(function() {
          deferred.resolve(_this);
        })
        .catch(function(e) {
          deferred.reject(e);
        });

      return deferred.promise;
    };
  });
