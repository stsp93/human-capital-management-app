const router = require('express').Router();

const userController = require('./controllers/userController');
const employeeController = require('./controllers/employeeController');
const departmentController = require('./controllers/departmentController');
const positionController = require('./controllers/positionController');


router.get('/', (req, res) => {
    res.json(['Hello World']);
});

router.use('/users', userController);
router.use('/employees', employeeController);
router.use('/departments', departmentController);
router.use('/positions', positionController);


module.exports = router
