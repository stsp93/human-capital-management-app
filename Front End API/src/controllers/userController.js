const { attachPaginationHrefs } = require('../helpers/pagination');
const { requireRoles } = require('../middlewares/authMiddleware');
const employeeService = require('../services/employeeService');
const userService = require('../services/userService');
const router = require('express').Router();

const roles = userService.getRoles();

const showDetails = async (req, res) => {
        try {
                const userData = await userService.getById(req.params.id, req.token);
                const employee = await employeeService.getById(userData.employeeId, req.token)
                res.render('details/userDetailsView', {userData, employee});
        } catch (error) {
                console.log(error);
                res.redirect(`/users/${req.user._id}/details`);
        }
};


const showAll = async (req, res) => {
        try {
                const users = await userService.getAll(req.query, req.token);
                const employees = await Promise.all(users.results.map((u) => employeeService.getById(u.employeeId, req.token)));
                users.results.forEach((u, i) => {
                        u.employee = employees[i];
                });
                
                attachPaginationHrefs(users, req.query);
                res.render('tables/usersList', { users });
        } catch (error) {
                console.log(error);
                res.render('tables/usersList', { error });
        }
}

const showEdit = async (req, res) => {
        try {
                const userData = await userService.getById(req.params.id, req.token);
                const employees = await employeeService.getAll(req.query, req.token);
                if(!employees.results.length) {
                        //set currently linked employee if any
                        const employee = await employeeService.getById(userData.employeeId, req.token);
                        if(employee) employees.results = [employee]; 
                }
                res.render('forms/userEdit', { userData, roles , employees});
        } catch (error) {
                console.log(error);
                res.render('forms/userEdit', { error });
        }
}

const edit = async (req, res) => {
        let userData;
        try {
                const linkedResults = (await userService.getAll({employeeId: req.body.employeeId}, req.token)).results
                const linked = linkedResults.length && linkedResults[0]._id !== req.params.id
                if(linked && req.body.noLink === undefined) throw new Error('Employee is already linked');
                userData = await userService.edit(req.params.id,req.body, req.token);
                res.redirect(`/users/${userData._id}/details`);
        } catch (error) {
                console.log(error);
                res.render('forms/userEdit', { error, userData: req.body, roles ,employees:{results:[]}});
        }
}

const showAdd = async (req, res) => {
        try {
                const employees = await employeeService.getAll(req.query, req.token);
                res.render('forms/userAdd', { employees ,roles});
        } catch (error) {
                console.log(error);
                res.render('forms/userAdd', { error,userData: req.body,roles });
        }
}

const add = async (req, res) => {
        
        try {
                const linked = (await userService.getAll({employeeId: req.body.employeeId}, req.token)).results.length > 0
                if(linked && req.body.noLink === undefined) throw new Error('Employee is already linked');
                const user = await userService.add(req.body, req.token);
                res.redirect(`/users/${user._id}/details`);
        } catch (error) {
                console.log(error);
                res.render('forms/userAdd', { error,roles});
        }
}


const remove = async (req, res) => {
        try {
                await userService.remove(req.params.id, req.token);
                const message = 'Successfully Removed';
                res.redirect(`/users?message=${message}`);
        }catch (error) {
                console.log(error);
                res.redirect(`/users?err=${error.message}`);
        }
}

const showChangePassword = async (req, res) => {
        try {
                if(req.user.role === 'user' && req.user._id !== req.params.id) return res.redirect(`/users/${req.user._id}/details`);
                res.render('forms/changePassword');
        }catch (error) {
                console.log(error);
                res.redirect(`/users?err=${error.message}`);
        }
}

const changePassword = async (req, res) => {
        try {
                await userService.changePassword(req.params.id, req.body, req.token);
                const message = 'Password successfully changed'
                res.redirect(`/users/${req.params.id}/details?message=${message}`);
        }catch (error) {
                console.log(error);
                res.redirect(`/users/${req.params.id}/details?err=${error.message}`);
        }
}

// partial manager/user access
router.get('/:id/details', showDetails);
router.get('/:id/changePassword', showChangePassword);
router.post('/:id/changePassword', changePassword);

// admin access
router.use(requireRoles('admin'));
router.get('/',showAll);
router.get('/add', showAdd);
router.post('/add', add);
router.get('/:id/edit', showEdit);
router.post('/:id/edit', edit);
router.get('/:id/delete',remove);

module.exports = router