const router = require('express').Router();
const authController = require('./controllers/authController');
const employeeController = require('./controllers/employeeController');
const positionController = require('./controllers/positionController');
const departmentController = require('./controllers/departmentController');
const leaveController = require('./controllers/leaveController');
const reviewController = require('./controllers/reviewController');
const salaryController = require('./controllers/salaryController');
const userController = require('./controllers/userController');
const { isAuth } = require('./middlewares/authMiddleware');
const errorMiddleware = require('./middlewares/errorMiddleware');


// Guest access
router.get('/', (req,res) => {
    req.user ? res.redirect(`/employees/${req.user.employeeId}`): res.redirect('/auth/login')
});
router.use('/auth', authController);
router.use(isAuth);
router.use(errorMiddleware)

// Auth access
router.use('/employees', employeeController);
router.use('/positions', positionController);
router.use('/departments', departmentController);
router.use('/leaves', leaveController);
router.use('/reviews', reviewController);
router.use('/salary', salaryController);
router.use('/users', userController);
router.use('*', (req,res) => res.render('404'));


module.exports = router
