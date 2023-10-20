const { requireRoles } = require('../middlewares/authMiddleware');
const salaryService = require('../services/salaryService');
const Controller = require('./Controller');
const router = require('express').Router();

class SalaryController extends Controller {
    constructor() {
        super(salaryService);
    }

    getById = async (req, res) => {
        const salaryId = req.params.id;
        const user = req.user
        try {
            const result = await this.service.getById(salaryId, user);
            return res.json(result);
        } catch (error) {
            this.errorResponse(res, error)
        }
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