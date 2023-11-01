const { requireRoles } = require('../middlewares/authMiddleware');
const salaryService = require('../services/salaryService');
const Controller = require('./Controller');
const router = require('express').Router();

class SalaryController extends Controller {
    constructor() {
        super(salaryService);
    }

    addBonus = async (req, res) => {
        try {
            const salaryId = req.params.id;
            const salary = await this.service.addBonus(salaryId, req.body);
            res.json(salary);
        } catch (error) {
            this.errorResponse(res, error)
        }
    }
    removeBonus = async (req, res) => {
        try {
            const bonusId = req.query.bonusId;
            const salaryId = req.params.id;
            const salary = await this.service.removeBonus(salaryId, bonusId);
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
router.delete('/:id/removeBonus', salaryController.removeBonus);
router.post('/:id/addBonus', salaryController.addBonus);
router.put('/:id', salaryController.update);

module.exports = router;