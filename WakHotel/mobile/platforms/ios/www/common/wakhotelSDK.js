/**
 * Created by stephanegarnier on 12/08/14.
 */
(function() {
    'use strict';

    angular.module('WakHotelSDK', ['wakanda']).
    factory('WakHotelBooking', ['$wakanda', '$q', function($wakanda, $q) {

        var Booking = {};

        Booking.getBookingFromUserId = function(userId) {
            var deferred = $q.defer();
            $wakanda.init().then(function(ds) {
                ds.Users.$find(userId, {
                    select: 'bookingCollection.room.type, bookingCollection.room.hotel'
                }).$promise.then(function(data) {
                    deferred.resolve(data.result.bookingCollection);
                });
            });
            return deferred.promise;
        };
        
        Booking.getMyBooking = function() {
            var deferred = $q.defer();
            $wakanda.init().then(function(ds) {
                $wakanda.$currentUser().then(function(user) {
                    Booking.getBookingFromUserId(user.result.ID).then(function(data) {
                        deferred.resolve(data);
                    });
                }); 
            });
            return deferred.promise;
        };
        return Booking;
    }]);

    angular.module('WakHotelSDK').
    factory('WakHotelAccount', ['$wakanda', '$q', function($wakanda, $q) {

        var Account = {};

        Account.getMyProfileAccount = function() {
            var deferred = $q.defer();
            $wakanda.init().then(function(ds) {
                $wakanda.$currentUser().then(function(user) {
                    ds.contacts.getUserFromCRM(user.result.userName).then(function(data) {
                        data.result.email = user.result.userName;
                        deferred.resolve(data.result);
                    });
                });
            });
            return deferred.promise;
        };

        Account.updateMyProfileAccount = function(email, first_name, last_name, primary_address_street, primary_address_city, primary_address_country, phone_mobile) {
            var deferred = $q.defer();
            $wakanda.init().then(function(ds) {
                ds.contacts.updateCRM(email,
                    first_name,
                    last_name,
                    primary_address_street,
                    primary_address_city,
                    primary_address_country,
                    phone_mobile).then(function(data) {
                    ds.contacts.getUserFromCRM(email).then(function(data) {
                        deferred.resolve(data.result);
                    });
                });
            });
            return deferred.promise;
        };
        return Account;
    }]);
})();