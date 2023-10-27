const { attachPaginationHrefs } = require('../helpers/pagination');
const departmentService = require('../services/departmentService');
const employeeService = require('../services/employeeService');
const positionService = require('../services/positionService');
const router = require('express').Router();


router.get('/:id', async (req, res) => {
        try {
                const employeeId = req.params.id

                const employee = await employeeService.getById(employeeId, req.token);
                employee.activePosition = await positionService.getById(employeeId, req.token);
                employee.department = await departmentService.getById(employee.activePosition.departmentId, req.token);
                employee.prevPositions = await positionService.getPrevPositions(employeeId, req.token);
                console.log(employee);
                // Check if allowed to edit info
                if (req.user.role !== 'user' || req.user.employeeId === employee._id) {
                        employee.allowEdit = true;
                }

                res.render('employeeDetailsView', employee);
        } catch (error) {
                console.log(error);
                if (error.status === 401) res.redirect('/auth/login');
                res.render('employeeDetailsView', { error });
        }
});


router.get('/', async (req, res) => {
        try {
                if (!req.query.page) req.query.page = 1;
                const employees = await employeeService.getAll(req.query, req.token)
                // Get positions
                const positions = await Promise.all(employees.results.map((emp) => positionService.getById(emp._id, req.token)));
                employees.results.forEach((emp, i) => {
                        emp.position = positions[i];
                });
                // get departments
                const departments = await Promise.all(positions.map((pos) => departmentService.getById(pos.departmentId, req.token)));
                employees.results.forEach((emp, i) => {
                        emp.position.department = departments[i];
                });

                attachPaginationHrefs(employees, req.query);
                res.render('employeesList', { employees });
        } catch (error) {
                console.log(error);
                res.render('employeesList', { error });
        }
})



module.exports = router