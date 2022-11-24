const router = require('express').Router();
const userRoutes = require('./user');
const parkingSlotRoutes = require('./parkingslot');
const slotBookingRoutes = require('./slotbooking');
const addressRoutes = require('./address');

router.use('/user', userRoutes);
router.use('/parkingSlot', parkingSlotRoutes);
router.use('/address', addressRoutes);
router.use('/slotBooking', slotBookingRoutes);

module.exports = router;