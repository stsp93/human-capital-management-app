const { requireRoles } = require('../middlewares/authMiddleware');
const leavesService = require('../services/leaveService');
const CustomError = require('../utilities/CustomError');
const Controller = require('./Controller');
const router = require('express').Router();

class LeaveController extends Controller {
    constructor() {
        super(leavesService);
    }

    resolve = async (req, res) => {
        try {
            const id = req.params.id;
            const userRole = req.user.role;
            const status = req.params.status;
            if (userRole === 'user') throw new CustomError('Unauthorized operation')
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

// Admin access
router.delete('/:id', leaveController.delete);
// Auth access
router.put('/:id/:status(approved|rejected)', leaveController.resolve);
router.use(requireRoles('admin', 'manager'));
router.post('/', leaveController.create);
router.put('/:id', leaveController.update);

module.exports = router;