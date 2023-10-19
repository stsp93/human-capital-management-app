const positionService = require('../services/positionService');
const Controller = require('./Controller');
const router = require('express').Router();

class PositionController extends Controller {
    constructor() {
        super(positionService);
    }
}

const positionController = new PositionController();

router.get('/', positionController.getAll);
router.get('/:id', positionController.getById);
router.post('/', positionController.create);
router.put('/:id', positionController.update);
router.delete('/:id', positionController.delete)

module.exports = router;