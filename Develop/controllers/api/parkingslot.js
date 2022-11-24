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


router.post('/', async (req, resp) => {
    try {
      console.log(req.body);
      const {street_name, street_number, state, postcode, suburb, slotNo, dates, tags, ...partialData} = req.body;
      console.log(dates, tags, partialData);
      //let tags = [];
      const addressData = await createAddress({street_name, street_number, state, postcode, suburb, slotNo});
      let parkingSlotData;
      if (addressData instanceof Address){
        parkingSlotData = await ParkingSlot.create({...partialData, "leaserId":`${req.session.user_id}`, "addressId": `${addressData.id}`});
        if (parkingSlotData instanceof ParkingSlot){
          /* Make entries in parkingSlotDates and LocationTags */
                    
          //parking slot dates persistence
          let parkingSlotDates = [];
          let incorrectDates = [];

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
      resp.status(200).json(parkingSlotData);
    } 
    catch (err) {
      resp.status(400).json(err);
    }
}); 

// searching a parkingSlot by date and LocationTag 
router.post('/search', async(req, resp) => {
  try{
    const parkingSlots = await ParkingSlot.findAll({include: [
                                      {model: User},
                                      {model: LocationTag, where: {locationTag: req.body.locationTag}}, 
                                      {model: ParkingSlotDates, where: {date: new Date(req.body.date)}}],});
    resp.status(200).json(parkingSlots);
  } 
  catch (err) {
    resp.status(400).json(err);
  }
});

//delete specific or all parking slots

//update specific details

module.exports = router;