/**
 * Created by stephanegarnier on 13/08/14.
 */


'use strict';

angular.module('WakHotel').
controller('modal_bookingController', ['$scope', 'dialogs', '$modalInstance', 'data', '$wakanda', function($scope, dialogs, $modalInstance, data, $wakanda) {
  $scope.myImage = '';
  $scope.myCroppedImage = '';
  $scope.disableCropOrCancel = false;

  $scope.toUpdate = data.toUpdate || false;

  $scope.errorMessage = "";
  $scope.errorLogMessage = "";

  $scope.login = function () {
    $wakanda.$login($scope.email, $scope.password).then(function(data){
      console.log(data);
      $modalInstance.close('ok');
    }, function(error){
      console.log(error);
    })
  };


  $scope.cancel = function() {
    $modalInstance.dismiss('cancel');
  };

}]);
