const router = require('express').Router();
const { ParkingSlot, Address, User, ParkingSlotDates, LocationTag} = require('../../models');


async function createAddress(addressData){
    try{
        console.log("From createAddress", addressData);
        const successData = await Address.create(addressData);
        return successData;
    }
    catch(err){
        return err;
    }
}

router.post('/', async (req, res) => {
    try {
      //console.log(req.body);
      const {street_name, street_number, state, postcode, suburb, slotNo, dates, tags,  ...partialData} = req.body;
      console.log(dates, tags);
      //const addressData = ;
      //const addressData = {street_name, street_number, state, postcode, suburb};
      const addressData = await createAddress({street_name, street_number, state, postcode, suburb, slotNo});
      //const parkingSlot = await ParkingSlot.create(req.body, result.id)
      let parkingSlotData;
      let parkingSlotDateFailure = [];
      if (addressData instanceof Address){
        /* create Parking slot. */
        //console.log()
        //console.log({...partialData, "leaserId":`${req.session.user_id}`, "addressId": `${addressData.id}`});
        parkingSlotData = await ParkingSlot.create({...partialData, "leaserId":`${req.session.user_id}`, "addressId": `${addressData.id}`});
        //console.log(req.session.user_id);
        if (parkingSlotData instanceof ParkingSlot){
          /* Make entries in parkingSlotDates */
          let parkingSlotDates = [];
          let incorrectDates = []
          //parking slot dates persistence
          dates.forEach(date => {
            const formattedDate = new Date(date);
            if (formattedDate instanceof Date){
              parkingSlotDates.push({"date": formattedDate, "parkingSlotId": parkingSlotData.id});
            }
            else{  
              incorrectDates.push(date);
            }  
          })
          parkingSlotDatesData = await ParkingSlotDates.bulkCreate(parkingSlotDates);
          parkingSlotData["incorrect_dates"] = incorrectDates;          
         
          //LocationTag persistence
          let locationTags = [];
          tags.forEach(tag => {
            locationTags.push({"locationTag": tag, "parkingSlotId": parkingSlotData.id});
          })
          console.log(locationTags);
          const locationTagData = await LocationTag.bulkCreate(locationTags);
        }; //end of if (parkingSlotData instanceof ParkingSlot)
      }; //end of if (addressData instanceof Address)      
      res.status(200).json(parkingSlotData);
    } catch (err) {
      res.status(400).json(err);
    }
});

module.exports = router;