const { attachPaginationHrefs } = require('../helpers/pagination');
const reviewsService = require('../services/reviewService');
const employeeService = require('../services/employeeService');
const router = require('express').Router();

router.get('/', async (req, res) => {
        try {
                const reviews = await reviewsService.getAll(req.query, req.token);
                attachPaginationHrefs(reviews, req.query);
                res.render('tables/reviewsList', {reviews});
        }catch(error) {
                console.log(error);
                res.render('tables/reviewsList', {error});
        }
})


router.get('/:id', async (req, res) => {
        try {
                const reviewId = req.params.id
                const review = await reviewsService.getById(reviewId, req.token);
                review.employee = await employeeService.getById(review.employeeId, req.token)
                review.reviewer = await employeeService.getById(review.reviewerId, req.token)
                res.render('details/reviewDetailsView', review);
        }catch(error) {
                console.log(error);
                res.render('details/reviewDetailsView', {error});
        }
})


module.exports = router;