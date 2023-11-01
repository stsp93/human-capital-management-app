const { attachPaginationHrefs } = require('../helpers/pagination');
const departmentService = require('../services/departmentService');
const employeeService = require('../services/employeeService');
const positionService = require('../services/positionService');
const salaryService = require('../services/salaryService');
const router = require('express').Router();



router.get('/', async (req, res) => {
    try {
        const positions = await positionService.getAll(req.query, req.token);
        const departmentId = positions.results[0]?.departmentId
        const department = await departmentService.getById(departmentId, req.token);
        const employees = await Promise.all(positions.results.map(pos => employeeService.getById(pos.employeeId, req.token)))
        positions.results.forEach((pos, i) => {
            pos.employee = employees[i];
        });
        attachPaginationHrefs(positions, req.query)
        res.render('tables/positionsList', { positions, department });
    } catch (error) {
        console.log(error);
        res.render('tables/positionsList', { error });
    }

})

router.get('/:id/edit', async (req, res) => {
    try {
            const position = await positionService.getById(req.params.id, req.token);
            const employee = await employeeService.getById(position.employeeId, req.token);
            const departments = await departmentService.getAll({limit:100}, req.token);
            const salary = await salaryService.getById(position.salaryId, req.token);
            // console.log(salary);
            res.render('forms/positionEdit', {position, departments ,employee, salary});
    }catch(error) {
            console.log(error);
            res.render('forms/positionEdit', {error});
    }
})

router.post('/:id/edit', async (req, res) => {
    try {
            const position = await positionService.edit(req.params.id,req.body, req.token)
            res.redirect(`/employee/${position.employeeId}`)
    }catch(error) {
            console.log(error);
            res.render('forms/positionEdit', {error,position:req.body});
    }
})

module.exports = router