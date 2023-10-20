const { requireRoles } = require('../middlewares/authMiddleware');
const reviewsService = require('../services/reviewService');
const Controller = require('./Controller');
const router = require('express').Router();

class ReviewController extends Controller {
    constructor() {
        super(reviewsService);
    }

    getAll = async (req, res) => {
        const user = req.user
        try {
            const results = await this.service.getAll(user);
            return res.json(results);
        } catch (error) {
            this.errorResponse(res, error)
        }
    }

    getById = async (req, res) => {
        const user = req.user;
        const reviewId = req.params.id;
        try {
            const result = await this.service.getById(reviewId, user);
            return res.json(result);
        } catch (error) {
            this.errorResponse(res,error)
        }
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
