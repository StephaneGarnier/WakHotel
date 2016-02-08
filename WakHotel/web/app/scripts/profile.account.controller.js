/**
 * Created by stephanegarnier on 13/08/14.
 */

'use strict';
angular.module('WakHotel').
    controller('profileAccountController', ['$rootScope', '$scope', '$wakanda',
        function ($rootScope, $scope, $wakanda) {

		$scope.notEditable = true;
		$wakanda.init().then(function(ds) {
			$wakanda.$currentUser().then(function(user){
				$scope.email = user.result.userName;
				console.log(user);
		    	ds.contacts.getUserFromCRM(user.result.userName).then(function(data) {
		    	  $scope.info = data.result;
		    	  console.log($scope.info);
		    	});
			});
		});
        $scope.save = function () {
        	$wakanda.init().then(function(ds) {
		    	ds.contacts.updateCRM($scope.email, 
		    	$scope.info.first_name.value, 
		    	$scope.info.last_name.value, 
		    	$scope.info.primary_address_street.value, 
		    	$scope.info.primary_address_city.value , 
		    	$scope.info.primary_address_country.value, 
		    	$scope.info.phone_mobile.value).then(function(data) {
		    	  ds.contacts.getUserFromCRM($scope.email).then(function(data) {
		    	  		$scope.info = data.result;
		    	  		console.log($scope.info);
		    	  		$scope.notEditable = true;
		    		});
		    	});
			});
        };
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
    }]);
