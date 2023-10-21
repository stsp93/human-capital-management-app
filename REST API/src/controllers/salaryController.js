const { requireRoles } = require('../middlewares/authMiddleware');
const salaryService = require('../services/salaryService');
const Controller = require('./Controller');
const router = require('express').Router();

class SalaryController extends Controller {
    constructor() {
        super(salaryService);
    }

    bonus = async (req, res) => {
        try {
            const bonus = req.body;
            const salaryId = req.params.id;
            const action = req.params.action;
            let salary;
            if(action === 'addBonus') salary = await this.service.addBonus(salaryId, bonus);
            if(action === 'removeBonus') salary = await this.service.removeBonus(salaryId, bonus);
            res.json(salary);
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
router.put('/:id/:action(addBonus|removeBonus)', salaryController.bonus);
router.put('/:id', salaryController.update);

module.exports = router;