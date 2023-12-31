const { attachPaginationHrefs } = require('../helpers/pagination');
const { requireRoles } = require('../middlewares/authMiddleware');
const departmentService = require('../services/departmentService');
const employeeService = require('../services/employeeService');
const positionService = require('../services/positionService');
const router = require('express').Router();

const showAll= async (req, res) => {
        try {
                const departments = await departmentService.getAll(req.query, req.token)
                attachPaginationHrefs(departments, req.query)
                res.render('tables/departmentsList', {departments});
        }catch(error) {
                console.log(error);
                res.render('tables/departmentsList', {error});
        }
}

const showEmployeesInDepartment = async (req, res) => {
        try {
                const query = req.query
                const positions = await positionService.getAll(query, req.token);
                const department = await departmentService.getById(query.departmentId, req.token);
                const employees = await Promise.all(positions.results.map(pos => employeeService.getById(pos.employeeId, req.token)))
                positions.results.forEach((pos, i) => {
                    pos.employee = employees[i];
                });
                attachPaginationHrefs(positions, query)
                res.render('tables/departmentEmployeeList', { positions, department });
            } catch (error) {
                console.log(error);
                res.render('tables/departmentEmployeeList', { error });
            }
}

const showDetails = async (req, res) => {
        try {
                const departmentId = req.params.id
                const department = await departmentService.getById(departmentId, req.token)
                const totalEmployees = await positionService.totalActiveInDepartment(departmentId, req.token)
                department.totalEmployees = totalEmployees;
                res.render('details/departmentDetailsView', {department});
        }catch(error) {
                console.log(error);
                res.render('details/departmentDetailsView', {error});
        }
}


const showEdit = async (req, res) => {
        try {
                const departmentId = req.params.id
                const department = await departmentService.getById(departmentId, req.token)
                res.render('forms/departmentEdit', {department});
        }catch(error) {
                console.log(error);
                res.render('forms/departmentEdit', {error});
        }
}

const edit = async (req, res) => {
        try {
                const department = await departmentService.edit(req.params.id, req.body,req.token);
                res.redirect(`/departments/${department._id}/details`);
        }catch(error) {
                console.log(error);
                res.render('forms/departmentEdit', {error});
        }
}

const showAdd = async (req, res) => {
        return res.render('forms/departmentAdd');
}

const add = async (req, res) => {
        try {
                const department = await departmentService.add(req.body,req.token);
                res.redirect(`/departments/`);
        }catch(error) {
                console.log(error)
                res.render('forms/departmentAdd', {department: res.body, error})
        }
}

const remove = async (req, res) => {
        try {
                await departmentService.remove(req.params.id, req.token);
                const message = 'Successfully removed'
                res.redirect(`/departments?message=${message}`)
        } catch (error) {
                console.log(error);
                res.redirect(`/departments?err=${error}`)
        }
}


router.get('/',showAll);
router.get('/employees',showEmployeesInDepartment);
router.get('/:id/details',showDetails) 

// Manager access
router.use(requireRoles('admin', 'manager'))
router.get('/add',showAdd);
router.post('/add',add);
router.get('/:id/edit',showEdit) 
router.post('/:id/edit',edit) 

// admin access
router.get('/:id/delete',requireRoles('admin'), remove);


module.exports = router