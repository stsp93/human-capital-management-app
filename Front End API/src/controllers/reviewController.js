const { attachPaginationHrefs } = require('../helpers/pagination');
const reviewsService = require('../services/reviewService');
const employeeService = require('../services/employeeService');
const reviewService = require('../services/reviewService');
const router = require('express').Router();


const ratings = []
for (let i = 0; i < 10; i++) {
        ratings[i] = i + 1;
}

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
                res.render('details/reviewDetailsView', { review, employee, reviewer });
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
                console.log(review);
                res.render('forms/reviewEdit', { review, ratings, employee, reviewer });
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
                const review = await reviewService.getById(req.params.id, req.token);
                const employee = await employeeService.getById(review.employeeId, req.token);
                const reviewer = await employeeService.getById(review.reviewerId, req.token);
                res.render('forms/reviewEdit', { error, review,ratings, employee ,reviewer });
        }
}

const showAdd = async (req, res) => {
        let reviewer;
        let employees = {};
        try {
                reviewer = await employeeService.getById(req.user.employeeId, req.token);
                employees = await employeeService.getAll({}, req.token);
                res.render('forms/reviewAdd', { reviewer, ratings, employees });
        } catch (error) {
                console.log(error);
                res.render('forms/reviewAdd', { error, reviewer, ratings, employees });
        }
}

const findEmployee = async (req, res) => {
        let reviewer;
        let employees = {};
        try {
                reviewer = await employeeService.getById(req.user.employeeId, req.token);
                employees = await employeeService.getAll(req.body, req.token);
                res.render('forms/reviewAdd', { employees, reviewer, search: req.body.search, ratings });
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

                res.redirect(`/reviews/${review._id}`)
        } catch (error) {
                res.render('forms/reviewAdd', { error, review: req.body,  reviewer, employees,ratings });
        }
}

router.get('/', showAll);
router.get('/add', showAdd);
router.post('/add', add);
router.post('/findEmployee', findEmployee);
router.get('/:id', showDetails);
router.get('/:id/edit', showEdit);
router.post('/:id/edit', edit);


module.exports = router;