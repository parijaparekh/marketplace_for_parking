//copy paste from mini_project /user 

const router = require('express').Router();
const { Sequelize } = require('sequelize');
const { User, ParkingSlot, ParkingSlotDates, Address, SlotBooking, LocationTag } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      console.log("Seesion Info", req.session);
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

//const parkingSlotInfo = async () => await

router.get('/dashboard', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    console.log(req.session.user_id);
    user_id = req.session.user_id;
    //user_id = 2;
    // parking slots available and slod for the user across all parkingSlots registered with him.
   
    let parkingSlotsInfo = await ParkingSlot.findAll({
      include: [ {model: Address}, {model: LocationTag},
                 {model: User, required: true, where: {id: user_id}} ],
                 nest: true, raw: true});
    
    parkingSlotsInfo.forEach(async parkingSlot => { 
              parkingSlot['parkingDatesAvailable'] = await ParkingSlotDates.findAll({
                                  where: {parkingSlotId: parkingSlot.id}, 
                                  nest: true, raw: true});});
    parkingSlotsInfo.forEach(async parkingSlot => { 
            parkingSlot['parkingDatesBooked'] = await SlotBooking.findAll({
                                where: {parkingSlotId: parkingSlot.id}, 
                                nest: true, raw: true});});                           

    console.log(...parkingSlotsInfo);
    //res.status(200).json(parkingSlotsBooked);
    // it 
    res.render('dashboard', {
      parkingSlotsInfo,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/logout', withAuth, (req, res) => {
  console.log("Logout");
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.redirect('/login');
      //res.status(204).end();
      //res.render('login');
    });
  } else {
    res.status(404).end();
    //res.render('login');
  }
});

module.exports = router;