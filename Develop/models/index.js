const User = require('./User');
const ParkingSlot = require('./ParkingSlot');
const SlotBooking = require('./SlotBooking');
const Address = require('./Address');
const ParkingSlotDates = require('./ParkingSlotDates');
const LocationTag = require('./LocationTag');

User.hasMany(ParkingSlot, {
    foreignKey: 'leaserId', 
    onDelete: 'CASCADE'
}); 

User.hasMany(SlotBooking, {
    foreignKey: 'bookedBy'
});

ParkingSlot.belongsTo(User, {
    foreignKey: "leaserId"
});

SlotBooking.belongsTo(User, {
    foreignKey: "bookedBy"
});

ParkingSlot.hasMany(SlotBooking, {
    foreignKey: "parkingSlotId"

});

ParkingSlot.hasMany(ParkingSlotDates, {
    foreignKey: "parkingSlotId", 
    onDelete: 'CASCADE'
});

ParkingSlot.hasMany(LocationTag, {
    foreignKey: "parkingSlotId", 
    onDelete: 'CASCADE'
});

ParkingSlotDates.belongsTo(ParkingSlot,{
    foreignKey: "parkingSlotId"
});

LocationTag.belongsTo(ParkingSlot,{
    foreignKey: "parkingSlotId"
});

SlotBooking.belongsTo(ParkingSlot,{
    foreignKey: "parkingSlotId"
});

Address.hasOne(ParkingSlot, {
    foreignKey: 'addressId', 
    onDelete: 'CASCADE'
});

ParkingSlot.belongsTo(Address, {
    foreignKey: 'addressId'
});

module.exports = {User, Address, ParkingSlot, ParkingSlotDates, LocationTag, SlotBooking};