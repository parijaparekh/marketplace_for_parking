const router = require('express').Router();
const { ParkingSlot,  User, SlotBooking} = require('../../models');

//Creates a new SlotBooking.... I think?
router.post('/', async (req, res) => {
    try {
      console.log(req.body);
      const {dateFrom, dateTo, ...partialData} = req.body;
      const slotBookingData =  await SlotBooking.create({...partialData, "bookedBy": `${req.session.user_id}`, "dateTimeFrom": new Date(dateFrom), "dateTimeTo": new Date(dateTo)});    
      res.status(200).json(slotBookingData);
    } 
    catch (err) {
      res.status(400).json(err);
    }
});

//Add update function 

module.exports = router;