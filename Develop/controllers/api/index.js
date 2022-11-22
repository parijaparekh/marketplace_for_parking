const router = require('express').Router();
const userRoutes = require('./user');
const parkingSlotRoutes = require('./parkingslot');
const slotsBookingRoutes = require('./slotsbooking');
const addressRoutes = require('./address');

router.use('/user', userRoutes);
router.use('/parkingSlot', parkingSlotRoutes);
router.use('/address', addressRoutes);
router.use('/slotsBooking', slotsBookingRoutes);

module.exports = router;