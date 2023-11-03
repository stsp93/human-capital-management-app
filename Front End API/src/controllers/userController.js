const { attachPaginationHrefs } = require('../helpers/pagination');
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
                res.render('details/userDetailsView', { error });
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
                userData = await userService.edit(req.params.id,req.body, req.token);
                res.redirect(`/users/${userData._id}`);
        } catch (error) {
                console.log(error);
                res.render('forms/userEdit', { error, userData, roles ,employees:{results:[]}});
        }
}

const showAdd = async (req, res) => {
        try {
                const employees = await employeeService.getAll(req.query, req.token);
                res.render('forms/userAdd', { employees ,roles});
        } catch (error) {
                console.log(error);
                res.render('forms/userAdd', { error,roles });
        }
}

const add = async (req, res) => {
        
        try {
                const user = await userService.add(req.body, req.token);
                res.redirect(`/users/${user._id}`);
        } catch (error) {
                console.log(error);
                res.render('forms/userAdd', { error,roles});
        }
}


const remove = async (req, res) => {
        try {
                await userService.remove(req.params.id, req.token);
                res.redirect('/users');
        }catch (error) {
                console.log(error);
                res.redirect('/users');
        }
}

router.get('/',showAll);
router.get('/add', showAdd);
router.post('/add', add);
router.get('/:id/edit', showEdit);
router.post('/:id/edit', edit);
router.get('/:id', showDetails);
router.get('/:id/delete',remove);

module.exports = router