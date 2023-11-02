const { attachPaginationHrefs } = require('../helpers/pagination');
const leaveService = require('../services/leaveService');
const employeeService = require('../services/employeeService');
const router = require('express').Router();

const showAll = async (req, res) => {
    try {
        if (!req.query.page) req.query.page = 1;
        const leaves = await leaveService.getAll(req.query, req.token)
        attachPaginationHrefs(leaves, req.query)
        res.render('tables/leavesList', { leaves });
    } catch (error) {
        console.log(error);
        res.render('tables/leavesList', { error });
    }
};

const showDetails = async (req, res) => {
    try {
        const leaveId = req.params.id;
        const leave = await leaveService.getById(leaveId, req.token);

        const employee = await employeeService.getById(leave.employeeId, req.token);
        leave.employee = employee;

        res.render('details/leavesDetailsView', leave);
    } catch (error) {
        console.log(error);
        res.render('details/leavesDetailsView', { error });
    }
}

const resolve = async (req, res) => {
    try {
        const id = req.params.id
        const status = req.params.status
        await leaveService.resolve(id, status, req.token);
        res.redirect(`/leaves/${id}`);
    } catch (error) {
        console.log(error);
        res.render('details/leavesDetailsView', { error });
    }
};


const showEdit = async (req, res) => {
    try {
        const leave = await leaveService.getById(req.params.id, req.token);
        const employee = await employeeService.getById(leave.employeeId, req.token);
        leave.employee = employee;
        res.render('forms/leaveEdit', { leave });
    } catch (error) {
        console.log(error);
        res.render('forms/leaveEdit', { error });
    }
}

const edit = async (req, res) => {
    try {
        const leave = await leaveService.edit(req.params.id, req.body, req.token)
        res.redirect(`/leaves/${leave._id}`)
    } catch (error) {
        console.log(error);
        res.render('forms/leaveEdit', { error, leave: req.body });
    }
}

const showAdd = async (req, res) => {
    const results = [await employeeService.getById(req.user.employeeId, req.token)];
    const employees = { results }
    res.render('forms/leaveAdd', { employees })
}

const findEmployee = async (req, res) => {
    const employees = await employeeService.getAll(req.body, req.token);
    res.render('forms/leaveAdd', { employees , search:req.body.search});
}

const add = async (req, res) => {
    const results = [await employeeService.getById(req.user.employeeId, req.token)];
    const employees = { results }
    try {
        const leave = await leaveService.add(req.body, req.token);
        res.redirect(`leaves/${leave._id}`);
    } catch(error) {
        console.log(error);
        res.render('forms/leaveAdd', { error , employees});
    }

}

router.get('/', showAll);
router.get('/add', showAdd);
router.post('/add', add);
router.post('/findEmployee', findEmployee);
router.get('/:id', showDetails)
router.post('/:id/edit', edit)

router.get('/:id/:status(approved|rejected)', resolve)
router.get('/:id/edit', showEdit)

module.exports = router;