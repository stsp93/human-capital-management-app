const reviewsService = require('../services/reviewsService');
const Controller = require('./Controller');
const router = require('express').Router();

class ReviewController extends Controller {
    constructor() {
        super(reviewsService);
    }
}

const reviewController = new ReviewController();

router.get('/', reviewController.getAll);
router.get('/:id', reviewController.getById);
router.post('/', reviewController.create);
router.put('/:id', reviewController.update);
router.delete('/:id', reviewController.delete)

module.exports = router;
