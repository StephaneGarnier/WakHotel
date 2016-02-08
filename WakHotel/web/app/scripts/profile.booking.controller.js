/**
 * Created by stephanegarnier on 13/08/14.
 */

'use strict';
angular.module('WakHotel').
    controller('profileBookingController', ['$rootScope', '$scope', 'dialogs', 'userId', '$wakanda',
    function ($rootScope, $scope, dialogs, userId, $wakanda) {
        $scope.listImages = [];
        $scope.page = [];
        $scope.currentPage = 0;
        $wakanda.init().then(function(ds) {
          ds.Users.$find(userId, { select: 'bookingCollection.room.type, bookingCollection.room.hotel' }).$promise.then(function(data) {
            $scope.booking = data.result.bookingCollection;
          })
        });

        $scope.show_detail = function (description) {
          dialogs.notify("Room detail", description);
        };

        $scope.cancel_booking = function (selectId) {
          var dlg = dialogs.confirm("Cancel the book", "Do you really want to cancel your booking ?", {size:"sm", backdrop:false});
          dlg.result.then(function(){
            $wakanda.init().then(function(ds) {
              var bookToDelete = $scope.booking[selectId];
              bookToDelete.$remove().then(function(){
                $scope.booking.splice(selectId, 1);
              });
            });
          },function(){
            console.log("cancel");
          });
        };
    }]);
