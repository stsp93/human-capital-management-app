const { attachPaginationHrefs } = require('../helpers/pagination');
const reviewsService = require('../services/reviewService');
const employeeService = require('../services/employeeService');
const reviewService = require('../services/reviewService');
const { requireRoles } = require('../middlewares/authMiddleware');
const router = require('express').Router();

const ratings = reviewService.getRatings();

const showAll = async (req, res) => {
        try {
                if (!req.query.page) req.query.page = 1;
                const reviews = await reviewsService.getAll(req.query, req.token);
                attachPaginationHrefs(reviews, req.query);
                console.log(reviews);
                res.render('tables/reviewsList', { reviews });
        } catch (error) {
                console.log(error);
                res.render('tables/reviewsList', { error });
        }
}

const getReviewData = async (reviewId, token) => {
        const review = await reviewsService.getById(reviewId, token);
        const employee = await employeeService.getById(review.employeeId, token)
        const reviewer = await employeeService.getById(review.reviewerId, token)

        return { review, employee, reviewer }
}


const showDetails = async (req, res) => {
        try {
                const reviewData = await getReviewData(req.params.id, req.token)
                res.render('details/reviewDetailsView', reviewData);
        } catch (error) {
                console.log(error);
                res.redirect(`/reviews?err=${error.message}`)
        }
}

const showEdit = async (req, res) => {
        try {
                const reviewData = await getReviewData(req.params.id, req.token)
                res.render('forms/reviewEdit', { ratings, ...reviewData });
        } catch (error) {
                console.log(error);
                res.render('forms/reviewEdit', { error });
        }
}

const edit = async (req, res) => {
        try {
                const review = await reviewService.edit(req.params.id, req.body, req.token);
                res.redirect(`/reviews/${review._id}/details`)
        } catch (error) {
                console.log(error);
                const reviewData = await getReviewData(req.params.id, req.token);
                res.render('forms/reviewEdit', { error, ratings, ...reviewData });
        }
}

const showAdd = async (req, res) => {
        let reviewer;
        let employees;

        try {
                reviewer = await employeeService.getById(req.user.employeeId, req.token);
                if (req.query.search) {
                        employees = await employeeService.getAll(req.query, req.token);
                }
                res.render('forms/reviewAdd', { reviewer, ratings, employees });
        } catch (error) {
                console.log(error);
                res.render('forms/reviewAdd', { error, reviewer, ratings, employees });
        }
}

const add = async (req, res) => {
        let reviewer;
        let employees = {};
        try {
                reviewer = await employeeService.getById(req.user.employeeId, req.token);
                employees = await employeeService.getAll(req.body, req.token);
                const review = await reviewService.add(req.body, req.token);

                res.redirect(`/reviews/${review._id}/details`)
        } catch (error) {
                res.render('forms/reviewAdd', { error, review: req.body, reviewer, employees, ratings });
        }
}

const remove = async (req, res) => {
        try {
                await reviewService.remove(req.params.id, req.token);
                const message = 'Successfully removed'
                res.redirect(`/reviews?message=${message}`)
        } catch (error) {
                console.log(error);
                res.redirect(`/reviews?err=${error}`)
        }
}
// partial user access
router.get('/', showAll);
router.get('/:id/details', showDetails);

// manager access
router.use(requireRoles('manager','admin'));
router.get('/add', showAdd);
router.post('/add', add);
router.get('/:id/edit', showEdit);
router.post('/:id/edit', edit);

// admin access
router.get('/:id/delete',requireRoles('admin'), remove);

module.exports = router;