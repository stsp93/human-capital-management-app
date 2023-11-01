const { attachPaginationHrefs } = require('../helpers/pagination');
const { checkEmptyFields } = require('../helpers/validation');
const departmentService = require('../services/departmentService');
const employeeService = require('../services/employeeService');
const positionService = require('../services/positionService');
const salaryService = require('../services/salaryService');
const router = require('express').Router();


const showDetails = async (req, res) => {
        try {
                const employeeId = req.params.id;

                const employee = await employeeService.getById(employeeId, req.token);
                const activePosition = await positionService.getById(employeeId, req.token);
                // Check if active position and get Department name
                const department = await departmentService.getById(activePosition?.departmentId , req.token);
                const prevPositions = await positionService.getPrevPositions(employeeId, req.token);
                // Check if allowed to edit info
                if (req.user.role !== 'user' || req.user.employeeId === employeeId) {
                        employee.allowEdit = true;
                }

                res.render('details/employeeDetailsView', {employee,activePosition,department,prevPositions});
        } catch (error) {
                console.log(error);
                if (error.status === 401) res.redirect('/auth/login');
                res.render('details/employeeDetailsView', { error });
        }
};


const showAll = async (req, res) => {
        try {
                if (!req.query.page) req.query.page = 1;
                const employees = await employeeService.getAll(req.query, req.token);
                // Get positions
                const positions = await Promise.all(employees.results.map((emp) => positionService.getById(emp._id, req.token)));
                employees.results.forEach((emp, i) => {
                        emp.position = positions[i];
                });
                // get departments
                const departments = await Promise.all(positions.map((pos) => departmentService.getById(pos.departmentId , req.token)));
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
                const employee = await employeeService.getById(req.params.id, req.token);
                res.render('forms/employeeEdit', {employee});
        } catch(error) {
                console.log(error);
                res.render('details/employeeDetailsView', { error });
        }
};

const edit = async (req, res) => {
        try {
                const input = req.body;
                const employee = await employeeService.edit(req.params.id,input, req.token);

                res.redirect(`/employees/${req.params.id}`)
        } catch(error) {
                console.log(error);
                res.render('forms/employeeEdit', {error, employee: req.body});
        }
};

const showAdd = async (req,res) => {
        try {
                res.render('forms/employeeAdd');
        }catch(error) {
                console.log(error);
                res.render('forms/employeeAdd', {error});
        }
}

const add = async (req,res) => {
        try {
                await employeeService.add(req.body, req.token);
                res.redirect('/employees/')
        }catch(error) {
                console.log(error);
                res.render('forms/employeeAdd', {input: req.body,error});
        }
}


router.get('/add',showAdd);
router.post('/add',add);
router.get('/',showAll);
router.get('/:id', showDetails);
router.get('/:id/edit',showEdit);
router.post('/:id/edit',edit);




module.exports = router