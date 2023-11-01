const { attachPaginationHrefs } = require('../helpers/pagination');
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
                const query = {departmentId: req.params.id}
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
                res.render('details/departmentDetailsView', department);
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
                res.redirect(`/departments/${department._id}`);
        }catch(error) {
                console.log(error);
                res.render('forms/departmentEdit', {error});
        }
}

router.get('/',showAll);
router.get('/:id',showDetails) 
router.get('/:id/employees',showEmployeesInDepartment);
router.get('/:id/edit',showEdit) 
router.post('/:id/edit',edit) 



module.exports = router