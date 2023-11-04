const { attachPaginationHrefs } = require('../helpers/pagination');
const { requireRoles, requireOwnership } = require('../middlewares/authMiddleware');
const departmentService = require('../services/departmentService');
const employeeService = require('../services/employeeService');
const positionService = require('../services/positionService');
const salaryService = require('../services/salaryService');
const router = require('express').Router();


const showDetails = async (req, res) => {
        try {
                const employee = await employeeService.getById(req.params.id, req.token);
                const activePosition = await positionService.getById(req.params.id, req.token);
                const salary = await salaryService.getById(activePosition?.salaryId, req.token);
                // Check if active position and get Department name
                const department = await departmentService.getById(activePosition?.departmentId, req.token);
                const prevPositions = await positionService.getPrevPositions(req.params.id, req.token);
                // Check if allowed to edit info
                if (req.user.role !== 'user' || req.user.employeeId === req.params.id) {
                        employee.allowEdit = true;
                }

                res.render('details/employeeDetailsView', { employee, activePosition, department, prevPositions, salary });
        } catch (error) {
                console.log(error);
                if (error.status === 401) res.redirect('/auth/login');
                res.render('details/employeeDetailsView', { error });
        }
};


const showAll = async (req, res) => {
        try {
                const employees = await employeeService.getAll(req.query, req.token);
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
                res.render('tables/employeesList', { employees });
        } catch (error) {
                console.log(error);
                res.render('tables/employeesList', { error });
        }
}

const showEdit = async (req, res) => {
        try {
                let employeeId = req.params.id
                if (req.user.role === 'user' && employeeId !== req.user.employeeId) {
                        return res.redirect(`/employees/${req.user.employeeId}/edit`)
                };
                const employee = await employeeService.getById(employeeId, req.token);
                res.render('forms/employeeEdit', { employee });
        } catch (error) {
                console.log(error)
                res.redirect(`/employees?err=${error.message}`);
        }
};

const edit = async (req, res) => {
        try {
                const input = req.body;
                const employee = await employeeService.edit(req.params.id, input, req.token);

                res.redirect(`/employees/${req.params.id}/details`)
        } catch (error) {
                console.log(error);
                res.render('forms/employeeEdit', { error, employee: req.body });
        }
};

const showAdd = async (req, res) => {
        try {
                res.render('forms/employeeAdd');
        } catch (error) {
                console.log(error);
                res.render('forms/employeeAdd', { error });
        }
}

const add = async (req, res) => {
        try {
                await employeeService.add(req.body, req.token);
                res.redirect('/employees')
        } catch (error) {
                console.log(error);
                res.render('forms/employeeAdd', { input: req.body, error });
        }
}

const remove = async (req, res) => {
        try {
                await employeeService.remove(req.params.id, req.token);
                res.redirect('/employees');
        } catch (error) {
                console.log(error);
                const message = 'Successfully removed'
                res.redirect(`/employees?message=${message}`);
        }
}
// user access
router.get('/', showAll);
router.get('/:id/details', showDetails);

// partial user access
router.get('/:id/edit', showEdit);
router.post('/:id/edit', edit);

// manager access
router.use(requireRoles('manager', 'admin'))
router.get('/add', showAdd);
router.post('/add', add);

// admin access
router.get('/:id/delete', requireRoles('admin'), remove);



module.exports = router