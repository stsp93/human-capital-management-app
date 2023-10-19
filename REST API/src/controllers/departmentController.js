const departmentService = require('../services/departmentService');
const Controller = require('./Controller');
const router = require('express').Router();

class DepartmentController extends Controller {
    constructor() {
        super(departmentService);
    }
}

const departmentController = new DepartmentController();

router.get('/', departmentController.getAll);
router.get('/:id', departmentController.getById);
router.post('/', departmentController.create);
router.put('/:id', departmentController.update);
router.delete('/:id', departmentController.delete)

module.exports = router;

