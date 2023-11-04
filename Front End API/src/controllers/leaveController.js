const { attachPaginationHrefs } = require('../helpers/pagination');
const leaveService = require('../services/leaveService');
const employeeService = require('../services/employeeService');
const { requireRoles, requireOwnership } = require('../middlewares/authMiddleware');
const router = require('express').Router();

const showAll = async (req, res) => {
    try {
        const leaves = await leaveService.getAll(req.query, req.token);
        const employees = await Promise.all(leaves.results.map((leave) => employeeService.getById(leave.employeeId, req.token)));
                leaves.results.forEach((leave, i) => {
                        leave.employee = employees[i];
                });
        attachPaginationHrefs(leaves, req.query)
        res.render('tables/leavesList', { leaves });
    } catch (error) {
        console.log(error);
        res.render('tables/leavesList', { error });
    }
};

const showDetails = async (req, res) => {
    try {
        const leave = await leaveService.getById(req.params.id, req.token);
        const employee = await employeeService.getById(leave.employeeId, req.token);

        res.render('details/leavesDetailsView', { leave, employee });
    } catch (error) {
        console.log(error);
        res.redirect(`/leaves?err=${ error.message }`);
    }
}

const resolve = async (req, res) => {
    try {
        const id = req.params.id
        const status = req.params.status
        await leaveService.resolve(id, status, req.token);
        res.redirect(`/leaves/${id}/details`);
    } catch (error) {
        console.log(error);
        res.render('details/leavesDetailsView', { error });
    }
};


const showEdit = async (req, res) => {
    try {
        const leave = await leaveService.getById(req.params.id, req.token);
        const employee = await employeeService.getById(leave.employeeId, req.token);
        res.render('forms/leaveEdit', { leave, employee });
    } catch (error) {
        console.log(error);
        res.redirect(`/leaves?err=${ error.message }`);
    }
}

const edit = async (req, res) => {
    let employee;
    try {
        employee = await employeeService.getById(req.body.employeeId, req.token);
        const leave = await leaveService.edit(req.params.id, req.body, req.token)
        res.redirect(`/leaves/${leave._id}/details`)
    } catch (error) {
        console.log(error);
        res.render('forms/leaveEdit', { error, leave: req.body, employee });
    }
}

const showAdd = async (req, res) => {
    let employees;
    if (req.query.search) {
        employees = await employeeService.getAll(req.query, req.token);
    }
    if (!employees?.results.length) {
        const results = [await employeeService.getById(req.user.employeeId, req.token)];
        employees = { results }
    }
    res.render('forms/leaveAdd', { employees })
}

const add = async (req, res) => {
    const results = [await employeeService.getById(req.user.employeeId, req.token)];
    try {
        const leave = await leaveService.add(req.body, req.token);

        res.redirect(`/leaves/${leave._id}/details`);
    } catch (error) {
        console.log(error);
        res.render('forms/leaveAdd', { error, employees: { results } });
    }
}

const remove = async (req, res) => {
    try {
        await leaveService.remove(req.params.id, req.token);
        const message = 'Successfully removed'
        res.redirect(`/leaves?message=${message}`);
    } catch (error) {
        console.log(error);
        res.redirect(`/leaves?err=${error}`);
    }
}
// User acces
router.get('/', showAll);
router.get('/add', showAdd);
router.post('/add', add);
// Partial User access
router.get('/:id/details', showDetails);
router.get('/:id/edit', showEdit)
router.post('/:id/edit', edit)

// manager access
router.get('/:id/:status(approved|rejected)',requireRoles('manager', 'admin'), resolve);

//admina ccess
router.get('/:id/delete',requireRoles('admin'), remove);

module.exports = router;