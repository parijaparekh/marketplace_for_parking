const router = require('express').Router();
const { User, ParkingSlot, SlotBooking, Address, LocationTag, ParkingSlotDates } = require('../models');
const withAuth = require('../utils/auth');

router.get('/dashboard', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{model: ParkingSlot}, 
                {model: SlotBooking}]
    });
    const user = userData.get({ plain: true });
    console.log(user);

    res.render('dashboard', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/rentaspot', withAuth, async (req, res) => {
  res.render('rentaspot', {logged_in: true});
});

router.get('/sellaspot', withAuth, async (req, res) => {
  res.render('sellaspot', {logged_in: true});
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }
  res.render('signup');
});

module.exports = router;
