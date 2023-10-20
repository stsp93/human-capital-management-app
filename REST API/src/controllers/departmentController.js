const { requireRoles } = require('../middlewares/authMiddleware');
const departmentService = require('../services/departmentService');
const Controller = require('./Controller');
const router = require('express').Router();

class DepartmentController extends Controller {
    constructor() {
        super(departmentService);
    }
}

const departmentController = new DepartmentController();

// User access
router.get('/', departmentController.getAll);
router.get('/:id', departmentController.getById);

// Admin access
router.delete('/:id', departmentController.delete);
// Auth Access
router.use(requireRoles('admin', 'manager'));
router.post('/', departmentController.create);
router.put('/:id', departmentController.update);

module.exports = router;

