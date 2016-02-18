angular.module('app.controllers', [])

.controller('wakHotelMobileCtrl', function($scope, $wakanda, $state, WakHotelAccount) {
    $scope.user = {email: "johndoe@wakanda.io", password: "test"};
    $scope.login = function() {
        $wakanda.$login($scope.user.email, $scope.user.password).then(function(data) {
            if (data.result == true) {
                $state.go("tabsController.booking");
            }
        });
    };
})

.controller('profileCtrl', function($scope, WakHotelAccount) {
    WakHotelAccount.getMyProfileAccount().then(function(res) {
    	console.log(res);
        $scope.info = res;
    })
})

.controller('bookingCtrl', function($scope, WakHotelBooking) {
	WakHotelBooking.getMyBooking().then(function(res){
		$scope.booking = res;
	});
})