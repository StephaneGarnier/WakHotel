
model.addSQLCatalog("sugarWakHotel", {
hostname: 'localhost',
user: 'root',
password: 'root',
database: "sugarcrm",
port: 3306,
ssl: false
});

include("./methods/Users/Users-methods.js");
include("./methods/Users/Users-events.js");

include("./methods/Rooms/Rooms-methods.js");
include("./methods/Hotels/Hotels-methods.js");
include("./methods/Booking/Booking-methods.js");
include("./methods/Booking/Booking-events.js");
include("./methods/Notifications/Notifications-methods.js");
include("./methods/Notifications/Notifications-events.js");