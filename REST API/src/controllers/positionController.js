const { requireRoles } = require('../middlewares/authMiddleware');
const positionService = require('../services/positionService');
const Controller = require('./Controller');
const router = require('express').Router();

class PositionController extends Controller {
    constructor() {
        super(positionService);
    }
}

const positionController = new PositionController();

// User access
router.get('/total', positionController.count);
router.get('/:id', positionController.getById);
router.get('/', positionController.getAll);

// Admin access
router.delete('/:id', positionController.delete)
// Auth access
router.use(requireRoles('admin','manager'));
router.post('/', positionController.create);
router.put('/:id', positionController.update);

module.exports = router;