const { attachPaginationHrefs } = require('../helpers/pagination');
const departmentService = require('../services/departmentService');
const positionService = require('../services/positionService');
const router = require('express').Router();

router.get('/', async (req, res) => {
        try {
                const departments = await departmentService.getAll(req.query, req.token)
                attachPaginationHrefs(departments, req.query)
                res.render('tables/departmentsList', {departments});
        }catch(error) {
                console.log(error);
                res.render('tables/departmentsList', {error});
        }
})

router.get('/:id', async (req, res) => {
        try {
                const departmentId = req.params.id
                const department = await departmentService.getById(departmentId, req.token)
                const totalEmployees = await positionService.totalActiveInDepartment(departmentId, req.token)
                department.totalEmployees = totalEmployees;
                res.render('details/departmentDetailsView', department);
        }catch(error) {
                console.log(error);
                res.render('details/departmentDetailsView', {error});
        }
})

router.get('/:id/edit', async (req, res) => {
        try {
                const departmentId = req.params.id
                const department = await departmentService.getById(departmentId, req.token)
                res.render('forms/departmentEdit', {department});
        }catch(error) {
                console.log(error);
                res.render('forms/departmentEdit', {error});
        }
})

router.post('/:id/edit', async (req, res) => {
        try {
                const department = await departmentService.edit(req.params.id, req.body,req.token);
                res.redirect(`/departments/${department._id}`);
        }catch(error) {
                console.log(error);
                res.render('forms/departmentEdit', {error});
        }
})


module.exports = router