const { attachPaginationHrefs } = require('../helpers/pagination');
const departmentService = require('../services/departmentService');
const router = require('express').Router();

router.get('/', async (req, res) => {
        try {
                const page = req.query.page || 1
                const departments = await departmentService.getAll(page, req.token)
                attachPaginationHrefs(departments, req.query)
                res.render('departmentsList', {departments});
        }catch(error) {
                console.log(error);
                res.render('departmentsList', {error});
        }
})



module.exports = router