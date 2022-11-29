const router = require('express').Router();
const { ParkingSlot, Address, User, ParkingSlotDates, LocationTag} = require('../../models');
const withAuth = require('../../utils/auth');

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

router.post('/', withAuth, async (req, resp) => {
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
              parkingSlotDates.push({"date": formattedDate, "parkingSlotId": parkingSlotData.id, "rate": parkingSlotData.rate});
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
router.get('/search', withAuth, async(req, resp) => {
  try{
    console.log("Printing stored data", req.query.locationTag, req.query.date);
    const parkingSlots = await ParkingSlot.findAll({include: [
                                      {model: User},
                                      {model: Address},
                                      {model: LocationTag, where: {locationTag: req.query.locationTag}}, 
                                      {model: ParkingSlotDates, where: {date: new Date(req.query.date)}}],
                                      raw: true,
                                      nest: true});
  
    console.log(...parkingSlots);
    resp.render('listspots', {parkingSlots, logged_in: true});  
    
  } 
  catch (err) {
    resp.status(400).json(err);
  }
});


/*Todo: Put in the code here to get the info about parkingSlot
  Need to use findByPk On ParkingSlot model and include address and locationTag models */
router.get('/' , withAuth, async (req, res) => {
  //res.render('EditParkingInfo handlebar, {parkingSlot, logged_in: true});
  try{
    console.log("Printing stored data", req.query.id);
    const parkingSlot = await ParkingSlot.findOne({ // this was the other thing that findByPK  doesn't work.
                                    where: {id: req.query.id},
                                    include: [
                                      {model: Address}, {model: LocationTag}],
                                    raw: true, nest: true});
  
    console.log(...[parkingSlot]); // This was the problem area @Tyson. shall explain you later 
    res.render('editParkingSpot', {parkingSlot, logged_in: true}); 
  } 
  catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

/*Todo: Put the code for update of parkingSlotInfo. 
 Editable fields are locationTags, All fields of address. */
router.put('/parkingSlotAddressUpdate/:id', withAuth, async (req, res) => {
  console.log("In parkingSlotAddressUpdate");
  const {slotNo, street_number, street_name, suburb, state, postcode} = req.body;
  try {
    const addressData = await Address.update(
    {
      slotNo : slotNo,
      street_number : street_number,
      street_name : street_name, 
      suburb: suburb,
      postcode: postcode,
      state: state, 
    },
    {
      where: {
        id: req.params.id,
      },
    });
    req.session.logged_in = true;
    res.status(200).json(addressData);
  } catch (err) {
      res.status(500).json(err);
  };
});

router.put('/parkingSlotLocationTagUpdate/:id', withAuth, async (req, res) => {
  console.log("In parkingSlotLocationTagUpdate");
  const tags = req.body.tags;
  console.log(tags, req.params.id);
  try {
    const locationTagsData = await LocationTag.update(
    {
      locationTag: tags[0],
    },
    {
      where: {
        id: req.params.id,
      },
    });
    //req.session.logged_in = true;
    res.status(200).json(locationTagsData);
  } catch (err) {
    res.status(500).json(err);
  };
});

router.put('/parkingDateUpdate/:id', withAuth, async (req, res) => {
  try {
    const parkingSlotDates = await ParkingSlotDates.update(
    {
      date: new Date(req.body.date),
      rate: req.body.rate
    },
    {
      where: {
        id: req.params.id,
      },
    });
    req.session.logged_in = true;
    res.status(200).json(parkingSlotDates);
  } catch (err) {
      res.status(500).json(err);
    };
});

router.delete('/parkingDateDelete/:id', withAuth, async (req, res) => {
  try {
    const parkingSlotDates =  await ParkingSlotDates.destroy({
      where: {
        id: req.params.id
      }});
    req.session.logged_in = true;
    
    if (!parkingSlotDates) {
      res.status(404).json({ message: 'The parking slot is not registered for this date' });
      return;
    }

    res.status(200).json({message: 'The parking slot is removed for this date'});
    }
  catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;