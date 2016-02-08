/**
 * Created by stephanegarnier on 19/08/15.
 */

'use strict';

angular.module('WakHotel').
    controller('navBarController', ['$scope', '$rootScope', '$wakanda','$state', function ($scope, $rootScope, $wakanda, $state) {
      $scope.navbarCollapsed = true;
      $scope.isLogged = false;
      $scope.isLoad = true;
      $scope.mail = "";
      $scope.pseudo = "";

      $wakanda.$currentUser().then(function(data){
        if (data.result === null){
          $scope.isLogged = false;
        } else {
          $scope.isLogged = true;
        }
      });

      $scope.logout = function () {
        $wakanda.$logout().then(function(){
          $state.go('search');
        })
      };

}]);
