

model.Booking.start_date_timestamp.onGet = function() {
	return this.start_date.getTime();
};


model.Booking.end_date_timestamp.onGet = function() {
	return this.end_date.getTime();
};
