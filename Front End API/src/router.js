const router = require('express').Router();
const authController = require('./controllers/authController');
const { auth } = require('./middlewares/authMiddleware');



router.use('/', authController);
router.use(auth);


module.exports = router
