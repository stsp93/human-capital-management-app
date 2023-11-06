const router = require('express').Router();

const userController = require('./controllers/userController');
const employeeController = require('./controllers/employeeController');
const departmentController = require('./controllers/departmentController');
const positionController = require('./controllers/positionController');
const salaryController = require('./controllers/salaryController');
const leavesController = require('./controllers/leaveController');
const reviewsController = require('./controllers/reviewController');
const { requireRoles } = require('./middlewares/authMiddleware');


router.get('/', (req, res) => {
    res.json(['Hello from HCM REST API']);
});

router.use('/users', userController);
router.use(requireRoles('admin', 'manager', 'user'));
router.use('/employees', employeeController);
router.use('/departments', departmentController);
router.use('/positions', positionController);
router.use('/salary', salaryController);
router.use('/leaves', leavesController);
router.use('/reviews', reviewsController);
router.use('*', (req, res) => {
    return res.status(404).json('Not Found');
})


module.exports = router
