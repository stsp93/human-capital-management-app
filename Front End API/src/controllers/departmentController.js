const { attachPaginationHrefs } = require('../helpers/pagination');
const departmentService = require('../services/departmentService');
const employeeService = require('../services/employeeService');
const positionService = require('../services/positionService');
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

router.get('/:id/employees', async(req,res) => {
        try {
                const departmentId = req.params.id
                const department = await departmentService.getById(departmentId, req.token);
                const positions = await positionService.getAll({departmentId}, req.token);
                const employees =await Promise.all(positions.results.map(pos => employeeService.getById(pos.employeeId, req.token)))
                positions.results.forEach((pos, i) => {
                        pos.employee = employees[i];
                });
                
                console.log(positions.results);
                res.render('departmentEmployeesList', { positions, department });
        }catch(error) {
                console.log(error);
                res.render('departmentEmployeesList', { error });
        }
        
})



module.exports = router