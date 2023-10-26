const departmentService = require('../services/departmentService');
const positionService = require('../services/positionService');
const router = require('express').Router();

router.get('/', async (req, res) => {
        try {
                const page = req.query.page || 1
                const departments = await departmentService.getAll(page, req.token)
                if(departments.nextPage) departments.nextPage = `page=${departments.nextPage}`
                if(departments.prevPage) departments.prevPage = `page=${departments.prevPage}`
                res.render('departmentsList', {departments});
        }catch(error) {
                console.log(error);
        }
})



module.exports = router