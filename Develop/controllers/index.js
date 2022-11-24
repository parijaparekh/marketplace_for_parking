const router = require('express').Router();
//changes for handlebars
const homeRoutes = require('./homeRoutes');
const apiRoutes = require('./api');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);

module.exports = router;