const { requireRoles } = require('../middlewares/authMiddleware');
const salaryService = require('../services/salaryService');
const Controller = require('./Controller');
const router = require('express').Router();

class SalaryController extends Controller {
    constructor() {
        super(salaryService);
    }
}

const salaryController = new SalaryController();

// User access
router.get('/:id', salaryController.getById);

// Admin access
router.delete('/:id', salaryController.delete);

// Auth access
router.use(requireRoles('admin', 'manager'))
router.get('/', salaryController.getAll);
router.post('/', salaryController.create);
router.put('/:id', salaryController.update);

module.exports = router;