const leavesService = require('../services/leavesService');
const Controller = require('./Controller');
const router = require('express').Router();

class LeaveController extends Controller {
    constructor() {
        super(leavesService);
    }
}

const leaveController = new LeaveController();

router.get('/', leaveController.getAll);
router.get('/:id', leaveController.getById);
router.post('/', leaveController.create);
router.put('/:id', leaveController.update);
router.delete('/:id', leaveController.delete)

module.exports = router;