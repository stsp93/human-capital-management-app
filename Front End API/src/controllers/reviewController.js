const { attachPaginationHrefs } = require('../helpers/pagination');
const reviewsService = require('../services/reviewService');
const employeeService = require('../services/employeeService');
const reviewService = require('../services/reviewService');
const router = require('express').Router();

const showAll = async (req, res) => {
        try {
                if (!req.query.page) req.query.page = 1;
                const reviews = await reviewsService.getAll(req.query, req.token);
                attachPaginationHrefs(reviews, req.query);
                res.render('tables/reviewsList', { reviews });
        } catch (error) {
                console.log(error);
                res.render('tables/reviewsList', { error });
        }
}


const showDetails = async (req, res) => {
        try {
                const reviewId = req.params.id
                const review = await reviewsService.getById(reviewId, req.token);
                const employee = await employeeService.getById(review.employeeId, req.token)
                const reviewer = await employeeService.getById(review.reviewerId, req.token)
                res.render('details/reviewDetailsView', {review, employee,reviewer});
        } catch (error) {
                console.log(error);
                res.render('details/reviewDetailsView', { error });
        }
}

const showEdit = async (req, res) => {
        try {
                const review = await reviewService.getById(req.params.id, req.token);
                const employee = await employeeService.getById(review.employeeId, req.token);
                const reviewer = await employeeService.getById(review.reviewerId, req.token);
                review.employee = employee
                review.reviewer = reviewer
                review.ratings = []
                for (let i = 0; i < 10; i++) {
                        review.ratings[i] = i + 1;
                }
                res.render('forms/reviewEdit', { review });
        } catch (error) {
                console.log(error);
                res.render('forms/reviewEdit', { error });
        }
}

const edit = async (req, res) => {
        try {
                const review = await reviewService.edit(req.params.id, req.body, req.token);

                res.redirect(`/reviews/${review._id}`)
        } catch (error) {
                console.log(error);
                res.render('forms/reviewEdit', { error, input: req.body });
        }
}


router.get('/', showAll);
router.get('/:id', showDetails);
router.get('/:id/edit', showEdit);
router.post('/:id/edit', edit);


module.exports = router;