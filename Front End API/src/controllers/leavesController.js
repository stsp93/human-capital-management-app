const { attachPaginationHrefs } = require('../helpers/pagination');
const leaveService = require('../services/leaveService');
const router = require('express').Router();

router.get('/', async (req, res) => {
        try {
                const page = req.query.page || 1
                const leaves = await leaveService.getAll(page, req.token)
                attachPaginationHrefs(leaves, req.query)
                
                res.render('leavesList', {leaves});
        }catch(error) {
                console.log(error);
                res.render('leavesList', {error});
        }
})

router.get('/:id/:status(approved|rejected)',async(req, res) => {
    try {
        const id = req.params.id
        const status = req.params.status
        const currentPage = req.query.page
        await leaveService.resolve(id, status, req.token);
        res.redirect(`/leaves?page=${currentPage}`);
    }catch(error) {
        console.log(error);
        res.render('leavesList', {error});
    }
});



module.exports = router;