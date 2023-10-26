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
        }
})



module.exports = router;