/**
 * Created by stephanegarnier on 13/08/14.
 */

'use strict';

angular.module('WakHotel').
controller('searchController', ['$scope', 'dialogs', '$state', '$wakanda', function($scope, dialogs, $state, $wakanda) {
  $wakanda.init().then(function(ds) {
  	ds.Hotels.search($scope.hotelAddress, $scope.dtStart, $scope.dtEnd).$promise.then(function (event) {
  		 $scope.hotels = $wakanda.$transform.$objectToCollection(event.result);
	});
  });

  var tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 7);
  $scope.dtStart = new Date();
  $scope.dtEnd = tomorrow;


  $scope.statusCalStart = {
    opened: false
  };

  $scope.statusCalEnd = {
    opened: false
  };

  $scope.openCalStart = function($event) {
    $scope.statusCalStart.opened = true;
  };

  $scope.openCalEnd = function($event) {
    $scope.statusCalEnd.opened = true;
  };

  $scope.hotel_search = function() {
    $wakanda.init().then(function(ds) {
      ds.Hotels.search($scope.hotelAddress, $scope.dtStart, $scope.dtEnd).$promise.then(function (event) {
  		 $scope.hotels = $wakanda.$transform.$objectToCollection(event.result);
		});
    });
  };
}]);
