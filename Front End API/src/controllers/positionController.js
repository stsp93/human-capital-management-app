const departmentService = require('../services/departmentService');
const employeeService = require('../services/employeeService');
const positionService = require('../services/positionService');
const salaryService = require('../services/salaryService');
const router = require('express').Router();



const showEdit = async (req, res) => {
        try {
                const position = await positionService.getById(req.params.id, req.token);
                const employee = await employeeService.getById(position.employeeId, req.token);
                const departments = await departmentService.getAll({ limit: 0 }, req.token);
                const salary = await salaryService.getById(position.salaryId, req.token);
                res.render('forms/positionEdit', { position, departments, employee, salary });
        } catch (error) {
                console.log(error);
                res.render('forms/positionEdit', { error });
        }
}

const edit = async (req, res) => {
        const employee = await employeeService.getById(req.params.id, req.token);
        const departments = await departmentService.getAll({ limit: 0 }, req.token);
        try {
                const position = await positionService.edit(req.params.id, req.body, req.token);
                res.redirect(`/employees/${position.employeeId}`)
        } catch (error) {
                console.log(error);
                res.render('forms/positionEdit', { error, position: req.body, employee,departments });
        }
}

const showAdd = async (req, res) => {
        const employee = await employeeService.getById(req.params.id, req.token);
        const departments = await departmentService.getAll({ limit: 0 }, req.token);
        try {
                res.render('forms/positionAdd', { departments, employee });
        } catch (error) {
                console.log(error);
                res.render('forms/positionAdd', { error, input: req.body, departments, employee });
        }
}

const add = async (req, res) => {
        const employee = await employeeService.getById(req.params.id, req.token);
        const departments = await departmentService.getAll({ limit: 0 }, req.token);

        try {
                const position = await positionService.add(req.params.id,req.body, req.token)
                res.redirect(`/positions/${position.employeeId}/edit`)
        } catch (error) {
                console.log(error);
                res.render('forms/positionAdd', { error, input: req.body, employee, departments });
        }
}

const endContract = async (req, res) => {
        try {
                await positionService.endContract(req.params.id, req.token)
                res.redirect(`/employees/${req.params.id}`)
        } catch (error) {
                console.log(error);
                res.redirect(`/employees/${req.params.id}`);
        }
}


router.get('/:id/edit', showEdit);
router.get('/:id/endContract', endContract);
router.get('/:id/add', showAdd);
router.post('/:id/edit', edit);
router.post('/:id/add', add);

module.exports = router