/**
 * Created by stephanegarnier on 13/08/14.
 */

'use strict';

angular.module('WakHotel').
controller('book_roomController', ['$scope', 'dialogs', '$state', '$stateParams', '$wakanda', function($scope, dialogs, $state, $stateParams, $wakanda) {
  $wakanda.init().then(function(ds) {
    ds.Rooms.search($stateParams.id, $stateParams.start,$stateParams.end).$promise.then(function(room){
      $scope.rooms =  $wakanda.$transform.$objectToCollection(room.result);
      console.log(room);
    });

    ds.Hotels.$find($stateParams.id).$promise.then(function(data) {
      $scope.hotel = data.result;
      console.log(data);
    })
  });

  $scope.goBack = function() {
    $state.go("search");
  }

  $scope.modal_book = function(room) {

    $wakanda.$currentUser().then(function(data){
      if (data.result === null){
        var dlg = dialogs.create('views/modal_booking.html',
          'modal_bookingController', {
          }, {
            size: 'md',
            keyboard: true,
            backdrop: false
          }
        );

        dlg.result.then(function() {
          $state.reload();
        }, function() {});
      } else {
        var dlg = dialogs.create('views/modal_booking.html',
          'modal_bookingController', {
              hotelId: $scope.hotel.ID,
              toUpdate: true,
              room:room
          }, {
            size: 'md',
            keyboard: true,
            backdrop: false
          }
        );

        dlg.result.then(function() {
          $state.reload();
        }, function() {});
      }
    });

  }
}]);
