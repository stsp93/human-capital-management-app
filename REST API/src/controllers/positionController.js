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
router.get('/', positionController.getAll);
router.get('/:id', positionController.getById);

// Admin access
router.delete('/:id', positionController.delete)
// Auth access
router.use(requireRoles('admin','manager'))
router.post('/', positionController.create);
router.put('/:id', positionController.update);

module.exports = router;