const { requireRoles } = require('../middlewares/authMiddleware');
const leavesService = require('../services/leaveService');
const CustomError = require('../utilities/CustomError');
const Controller = require('./Controller');
const router = require('express').Router();

class LeaveController extends Controller {
    constructor() {
        super(leavesService);
    }

    getAll = async (req, res) => {
        const user = req.user
        try {
            const results = await this.service.getAll(user);
            return res.json(results);
        } catch (error) {
            this.errorResponse(res, error);
        }
    }

    getById = async (req, res) => {
        const leaveId = req.params.id;
        const user = req.user
        try {
            const result = await this.service.getById(leaveId, user);
            return res.json(result);
        } catch (error) {
            this.errorResponse(res, error);
        }
    }

    resolve = async (req,res) => {
        const id = req.params.id;
        const userRole = req.user.role;
        const status = req.params.status;
        try {
            if(userRole !== 'admin') throw new CustomError('Unauthorized operation')
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
router.put('/:id/:status(approved|rejected)', leaveController.resolve);
// Auth access
router.use(requireRoles('admin','manager'));
router.post('/', leaveController.create);
router.put('/:id', leaveController.update);

module.exports = router;