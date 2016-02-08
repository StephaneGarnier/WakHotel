/**
 * Created by stephanegarnier on 13/08/14.
 */

'use strict';
angular.module('WakHotel').
    controller('createAccountController', ['$rootScope', '$scope', '$wakanda', '$state', function ($rootScope, $scope, $wakanda, $state) {
		
		$scope.isSubmit = false;
        $scope.email = "";
        $scope.password = "";
        $scope.firstname = "";
        $scope.lastname = "";
        $scope.signupUserId = "";
        $scope.password = "";
        $scope.signupUserPassword = "";
        $scope.errorMessage = "";
        $scope.errorLogMessage = "";
      
		$scope.submit = function () {
            $scope.errorMessage = "";
            $scope.isSubmit = true;
 
            $wakanda.init("Users").then(function (ds) {
        	
	        	ds.Users.create($scope.email , $scope.password , $scope.firstname , $scope.lastname, "Users").$promise.then(function(event){
	        		console.log(event.result);
	        	});
        	})
    	};
    }]);