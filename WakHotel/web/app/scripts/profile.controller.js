/**
 * Created by stephanegarnier on 13/08/14.
 */

'use strict';
angular.module('WakHotel').
    controller('profileController', ['$rootScope', '$scope', '$state', 'dialogs', '$wakanda', 'userId',
    function ($rootScope, $scope, $state, dialogs, $wakanda, userId) {
        $scope.numberReports = 0;
        $scope.numberPhotos = 0;
        $wakanda.init().then(function(ds) {
          ds.Users.$find(userId, { select: 'bookingCollection' }).$promise.then(function(data) {
            $scope.user = data.result;
            $scope.numberPhotos = data.result.bookingCollection.length;
            console.log($scope.booking);
          })
        });
        $scope.modal_modify_avatar = function() {
            // console.log("toto");
            // var dlg = dialogs.create('modal/modal_modify_avatar.html',treo
            //     'modal_modify_avatarController',
            //     {userId:$scope.mail},
            //     {size:'md',keyboard: true,backdrop: false}
            // );
            //
            // dlg.result.then(function(){
            //     $state.reload();
            // },function(){
            // });
        };

        $scope.logout = function () {
            $rootScope.$broadcast('sweebi_logout_success');
        };
    }]);
