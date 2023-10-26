const { requireRoles } = require('../middlewares/authMiddleware');
const leavesService = require('../services/leaveService');
const Controller = require('./Controller');
const router = require('express').Router();

class LeaveController extends Controller {
    constructor() {
        super(leavesService);
    }

    resolve = async (req, res) => {
        try {
            const id = req.params.id;
            const status = req.params.status;

            const resolvedLeave = await this.service.resolve(id, status);
            res.json(resolvedLeave);
        } catch (error) {
            this.errorResponse(res, error);
        }
    }
}

const leaveController = new LeaveController();

// User access
router.get('/:id', leaveController.getById);
router.get('/', leaveController.getAll);
router.post('/', leaveController.create);

// Admin access
router.delete('/:id', leaveController.delete);
// Auth access
router.use(requireRoles('admin', 'manager'));
router.put('/:id/:status(approved|rejected)', leaveController.resolve);
router.put('/:id', leaveController.update);

module.exports = router;