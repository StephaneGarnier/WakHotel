/**
 * Created by stephanegarnier on 13/08/14.
 */

'use strict';
angular.module('WakHotel').
    controller('loginController', ['$rootScope', '$scope', '$wakanda', '$state', function ($rootScope, $scope, $wakanda, $state) {
        $scope.errorMessage = "";
        $scope.errorLogMessage = "";
		$scope.email = "johndoe@wakanda.io";
		$scope.password = "test";
        $scope.login = function () {

          $wakanda.$login($scope.email, $scope.password).then(function(data){
          	$state.go("search");
          }, function(error){
          	console.log(error);
          })
        };

    }]);
