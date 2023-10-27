const { attachPaginationHrefs } = require('../helpers/pagination');
const reviewsService = require('../services/reviewService');
const router = require('express').Router();

router.get('/', async (req, res) => {
        try {
                const page = req.query.page || 1
                const reviews = await reviewsService.getAll(page, req.token);
                attachPaginationHrefs(reviews, req.query);
                console.log(reviews);
                res.render('reviewsList', {reviews});
        }catch(error) {
                console.log(error);
                res.render('reviewsList', {error});
        }
})




module.exports = router;