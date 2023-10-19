const { requireRoles } = require('../middlewares/authMiddleware');
const employeeService = require('../services/employeeService');
const Controller = require('./Controller');
const router = require('express').Router();

class EmployeeController extends Controller {
    constructor() {
        super(employeeService);
    }
}

const employeeController = new EmployeeController();

// User access
router.get('/', employeeController.getAll);
router.get('/:id', employeeController.getById);
router.put('/:id', employeeController.update);

// Auth access
router.post('/',requireRoles('admin', 'hr'), employeeController.create);
// Admin access
router.delete('/:id', employeeController.delete);

module.exports = router;