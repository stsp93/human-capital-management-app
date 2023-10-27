const router = require('express').Router();
const authController = require('./controllers/authController');
const employeeController = require('./controllers/employeeController');
const positionController = require('./controllers/positionController');
const departmentController = require('./controllers/departmentController');
const leaveController = require('./controllers/leaveController');
const reviewController = require('./controllers/reviewController');
const { isAuth } = require('./middlewares/authMiddleware');


// Guest access
router.get('/', (req,res) => {
    req.user ? res.redirect(`/employees/${req.user.employeeId}`): res.redirect('/auth/login')
});
router.use('/auth', authController);
router.use(isAuth);

// Auth access
router.use('/employees', employeeController);
router.use('/positions', positionController);
router.use('/departments', departmentController);
router.use('/leaves', leaveController);
router.use('/reviews', reviewController);


module.exports = router
