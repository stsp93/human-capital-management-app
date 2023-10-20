const { requireRoles } = require('../middlewares/authMiddleware');
const reviewsService = require('../services/reviewService');
const Controller = require('./Controller');
const router = require('express').Router();

class ReviewController extends Controller {
    constructor() {
        super(reviewsService);
    }
}

const reviewController = new ReviewController();

// User access
router.get('/', reviewController.getAll);
router.get('/:id', reviewController.getById);

// Admin access
router.delete('/:id', reviewController.delete);
// Auth access
router.use(requireRoles('admin', 'manager'));
router.post('/', reviewController.create);
router.put('/:id', reviewController.update);

module.exports = router;
