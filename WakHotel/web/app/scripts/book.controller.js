/**
 * Created by stephanegarnier on 13/08/14.
 */

'use strict';

angular.module('WakHotel').
controller('bookController', ['$scope', 'dialogs', '$state', '$stateParams', '$wakanda', function($scope, dialogs, $state, $stateParams, $wakanda) {

  $('.flexslider').flexslider({
    animation: "fade",
    controlNav: "thumbnails"
  });

  $scope.start_date = $stateParams.start;
  $scope.end_date = $stateParams.end;
  $wakanda.init().then(function(ds) {
    ds.Rooms.search($stateParams.id, $stateParams.start,$stateParams.end).$promise.then(function(room){
      $scope.rooms =  $wakanda.$transform.$objectToCollection(room.result);
      $scope.rooms.forEach(function(room){
      	room.type.$fetch();
      });
     
    });

    ds.Hotels.$find($stateParams.id).$promise.then(function(data) {
      $scope.hotel = data.result;
      console.log(data);
    })
  });

  $scope.goBack = function() {
    $state.go("search");
  }

  var bookARoom = function(roomId, userId, start_date, end_date){
    $wakanda.init().then(function(ds) {
      ds.Booking.book(roomId, userId, start_date, end_date).$promise.then(function(){
        console.log("book");
      });
    });
  }

  $scope.modal_book = function(room) {

    $wakanda.$currentUser().then(function(user){
      if (user.result === null){
        var dlg = dialogs.create('views/modal_booking.html',
          'modal_bookingController', {
          }, {
            size: 'md',
            keyboard: true,
            backdrop: false
          }
        );
        dlg.result.then(function() {
          $wakanda.$currentUser().then(function(user){
            bookARoom(room.ID, user.result.ID,  $stateParams.start, $stateParams.end);
          });
        }, function(){
          console.log("cancel");
        });
      } else {
        var dlg = dialogs.confirm("Book the room", "Do you really want to book this room ?", {size:"sm", backdrop:false});
        dlg.result.then(function(){
          bookARoom(room.ID, user.result.ID,  $stateParams.start, $stateParams.end);
          $state.go("profile.booking");
        },function(){
          console.log("cancel");
        });
      }
    });

  }
}]);
