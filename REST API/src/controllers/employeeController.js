const employeeService = require('../services/employeeService');
const Controller = require('./Controller');
const router = require('express').Router();

class EmployeeController extends Controller {
    constructor() {
        super(employeeService);
    }
}

const employeeController = new EmployeeController();

router.get('/', employeeController.getAll);
router.get('/:id', employeeController.getById);
router.post('/', employeeController.create);
router.put('/:id', employeeController.update);
router.delete('/:id', employeeController.delete)

module.exports = router;