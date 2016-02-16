/**
 * Created by stephanegarnier on 13/08/14.
 */

'use strict';
angular.module('WakHotel').
    controller('profileAccountController', ['$rootScope', '$scope', '$wakanda', 'WakHotelAccount',
        function ($rootScope, $scope, $wakanda, WakHotelAccount) {

		$scope.notEditable = true;
		WakHotelAccount.getMyProfileAccount().then(function(res){
			$scope.info = res;
		})
		
        $scope.save = function () {
		    	WakHotelAccount.updateMyProfileAccount($scope.info.email, 
		    	$scope.info.first_name.value, 
		    	$scope.info.last_name.value, 
		    	$scope.info.primary_address_street.value, 
		    	$scope.info.primary_address_city.value , 
		    	$scope.info.primary_address_country.value, 
		    	$scope.info.phone_mobile.value).then(function(res) {
		    		$scope.info = res;
		    		$scope.notEditable = true;
		    	});
        };
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
    }]);
