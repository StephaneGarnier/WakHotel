

model.Notifications.methods.AddNotification = function(bookingId, notifType, description) {
	var notification = ds.Notifications.createEntity();
	
	var booking = ds.Booking.find('ID=:1', bookingId);
	
	var type = ds.Notifications_types.find('name=:1', notifType);
	
	notification.description = description;
	notification.type = type;
	notification.booking = booking;
	
	notification.save();
};

model.Notifications.methods.AddNotification.scope = 'public';

model.Notifications.methods.RemoveNotification = function(bookingId, notifType) {
	var notification = ds.Notifications.find('booking.ID=:1 and type.name=:2', bookingId, notifType);
	notification.remove();
};

model.Notifications.methods.RemoveNotification.scope = 'public';


model.Notifications.methods.ChangeTaskState = function(notifID, taskIsDone) {
	var notification = ds.Notifications.find('ID=:1 and type.name="Make my room"', notifID);
	notification.task_done = taskIsDone;
	notification.save();
};

model.Notifications.methods.ChangeTaskState.scope = 'public';