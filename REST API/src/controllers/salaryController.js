const salaryService = require('../services/salaryService');
const Controller = require('./Controller');
const router = require('express').Router();

class SalaryController extends Controller {
    constructor() {
        super(salaryService);
    }
}

const salaryController = new SalaryController();

router.get('/', salaryController.getAll);
router.get('/:id', salaryController.getById);
router.post('/', salaryController.create);
router.put('/:id', salaryController.update);
router.delete('/:id', salaryController.delete)

module.exports = router;