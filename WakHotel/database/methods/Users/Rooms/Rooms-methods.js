model.Rooms.methods.create = function(number, price, typeId, hotelId) {
	var room = ds.Rooms.createEntity();
	room.number = number;
	room.price = price;
	
	room.type = ds.Room_Type.find('ID==:1',typeId);
	room.hotel = ds.Hotels.find('ID==:1',hotelId);
	
	room.save();
};

model.Rooms.methods.create.scope = 'public';


model.Rooms.methods.update = function(number, price, typeId, roomId) {
	var room = ds.Rooms.find('ID==:1',roomId);
	
	room.number = number;
	room.price = price;
	room.type = ds.Room_Type.find('ID==:1',typeId);
	
	room.save();
};

model.Rooms.methods.update.scope = 'public';


model.Rooms.methods.search = function(hotelId, startDate, endDate) {
	
	if (startDate == null || startDate == "") {
		startDate = new Date();
	} 
	if (endDate == null || endDate == "") {
		endDate = new Date();
		endDate.setDate(startDate.getDate() + 7);
	}

	var BookRooms = ds.Booking.query('room.hotel.ID==:1 and (end_date >:2 and start_date <=:3)',hotelId, startDate, endDate);

	var AvailableRooms = ds.Rooms.query('hotel.ID==:1', hotelId).minus(ds.Rooms.query('ID in :1', BookRooms.room.ID));
	
	return AvailableRooms;
};

model.Rooms.methods.search.scope = 'public';
