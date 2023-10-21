const { requireRoles } = require('../middlewares/authMiddleware');
const positionService = require('../services/positionService');
const Controller = require('./Controller');
const router = require('express').Router();

class PositionController extends Controller {
    constructor() {
        super(positionService);
    }

    getAll = async (req, res) => {
        try {
            const user = req.user
            const results = await this.service.getAll(user);
            return res.json(results);
        } catch (error) {
            this.errorResponse(res, error);
        }
    }

}

const positionController = new PositionController();

// User access
router.get('/', positionController.getAll);
router.get('/:id', positionController.getById);

// Admin access
router.delete('/:id', positionController.delete)
// Auth access
router.use(requireRoles('admin','manager'));
router.post('/', positionController.create);
router.put('/:id', positionController.update);

module.exports = router;