//copy paste from mini_project /user 

const router = require('express').Router();
const { User } = require('../../models');
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

router.get('/logout', withAuth, (req, res) => {
  console.log("Logout");
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
      res.render('login');
    });
  } else {
    res.status(404).end();
    res.render('login');
  }
});

//Update user details, then returns the message that details are updated.
router.put('/:id', async(req, res) => {
  try {
    const updatedUser = await User.update(
      {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: req.body.password
      },
      {
        where:{
          id: req.params.id
        },
        individualHooks: true
      })
      res.status(200).json({message: "User details updated!"})
  } 
  catch (err) {
    res.status(400).json(err)
  }
})

module.exports = router;