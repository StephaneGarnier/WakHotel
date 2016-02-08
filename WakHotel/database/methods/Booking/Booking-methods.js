

model.Booking.methods.book = function(roomId, userId, start_date, end_date) {
	var booking = ds.Booking.createEntity();
	
	var user = ds.Users.find('ID=:1', userId);
	
	var room = ds.Rooms.find('ID=:1', roomId);
	
	booking.start_date = start_date;
	booking.end_date = end_date;
	booking.nights = booking.end_date.getUTCDate() - booking.start_date.getUTCDate();
	booking.price = booking.nights * room.price;
	booking.room = room;
	booking.client = user;
	
	booking.save();
};

model.Booking.methods.book.scope = 'public';


model.Booking.methods.CheckIn = function(bookId) {
	var book = ds.Booking.find("ID=:1", bookId);
	
	book.checkOut = false;
	book.checkIn = true;
	book.room_code = 12345;
	
	book.save();
	
	return book;
	// Add your code here;
};

model.Booking.methods.CheckIn.scope = 'public';

model.Booking.methods.CheckOut = function(bookId) {
	var book = ds.Booking.find("ID=:1", bookId);
	
	book.checkOut = true;
	book.checkIn = false;
	book.room_code = "";
	
	book.save();
	
	return book;
	// Add your code here;
};

model.Booking.methods.CheckOut.scope = 'public';
