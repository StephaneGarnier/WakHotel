

model.Hotels.methods.update = function(name, address, stars, hotelId) {
	var hotel = ds.Hotels.find('ID==:1',hotelId);
	
	hotel.name = name;
	hotel.address = address;
	hotel.stars = stars;
	
	hotel.save();
};

model.Hotels.methods.update.scope = 'public';

model.Hotels.methods.create = function(name, address, stars) {
	var hotel = ds.Hotels.createEntity();
	
	hotel.name = name;
	hotel.address = address;
	hotel.stars = stars;
	
	hotel.save();
};

model.Hotels.methods.create.scope = 'public';

model.Hotels.methods.search = function(search, startDate, endDate) {
	
	if (search == null || search == "") {
		search = "*";
	}
	if (startDate == null || startDate == "") {
		startDate = new Date();
	} 
	if (endDate == null || endDate == "") {
		endDate = new Date();
		endDate.setDate(startDate.getDate() + 7);
	}
	
	var BookRooms = ds.Booking.query('room.hotel.address==:1 and (end_date >:2 and start_date <=:3)',search, startDate, endDate);

	var AvailableRooms = ds.Rooms.query('hotel.address==:1', search).minus(ds.Rooms.query('ID in :1', BookRooms.room.ID));
	
	var availableHotels = ds.Hotels.query('roomsCollection.ID in :1', AvailableRooms.ID);
	
	return availableHotels;
};

model.Hotels.methods.search.scope = 'public';
