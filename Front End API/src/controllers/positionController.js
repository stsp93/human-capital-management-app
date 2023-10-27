const { attachPaginationHrefs } = require('../helpers/pagination');
const departmentService = require('../services/departmentService');
const employeeService = require('../services/employeeService');
const positionService = require('../services/positionService');
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



module.exports = router