const router = require('express').Router();
const authController = require('./controllers/authController');
const employeeController = require('./controllers/employeeController');
const departmentController = require('./controllers/departmentController');
const { isAuth } = require('./middlewares/authMiddleware');


// Guest access
router.get('/', (req,res) => {
    req.user ? res.redirect(`/employees/${req.user.employeeId}`): res.redirect('/auth/login')
});
router.use('/auth', authController);
router.use(isAuth);

// Auth access
router.use('/employees', employeeController);
router.use('/departments', departmentController);


module.exports = router
