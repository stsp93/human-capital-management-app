const router = require('express').Router();
const authController = require('./controllers/authController');
const employeesController = require('./controllers/employeesController');
const { auth, checkAuth } = require('./middlewares/authMiddleware');



router.use(auth);
router.get('/', checkAuth);
router.use('/auth', authController);
router.use('/employees', employeesController);


module.exports = router
