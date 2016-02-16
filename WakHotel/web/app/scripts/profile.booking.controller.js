/**
 * Created by stephanegarnier on 13/08/14.
 */

'use strict';
angular.module('WakHotel').
    controller('profileBookingController', ['$rootScope', '$scope', 'dialogs', 'userId', '$wakanda', 'WakHotelBooking',
    function ($rootScope, $scope, dialogs, userId, $wakanda, WakHotelBooking) {
        $scope.listImages = [];
        $scope.page = [];
        $scope.currentPage = 0;
        WakHotelBooking.getBookingFromUserId(userId).then(function(res){
        	$scope.booking = res;
        	console.log(res);
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
