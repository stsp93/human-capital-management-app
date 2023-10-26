const {attachPaginationHrefs} = require('../helpers/pagination');
const employeeService = require('../services/employeeService');
const positionService = require('../services/positionService');
const router = require('express').Router();


router.get('/:id', async (req, res) => {
        try {
                const employeeId = req.params.id

                const employee = await employeeService.getById(employeeId, req.token);
                const activePosition = await positionService.getById(employeeId, req.token);
                const prevPositions = await positionService.getPrevPositions(employeeId, req.token);
                employee.activePosition = activePosition;
                employee.prevPositions = prevPositions;
                // Check if allowed to edit info
                if(req.user.role !== 'user' || req.user.employeeId === employee._id) {
                        employee.allowEdit = true;
                }

                res.render('employeeDetailsView', employee);
        }catch(error) {
                console.log(error);
                if(error.status === 401) res.redirect('/auth/login');
                res.render('employeeDetailsView', {error});
        }
});


router.get('/', async (req, res) => {
        try {
                if(!req.query.page) req.query.page = 1;
                
                const positions = await positionService.getAll(req.query, req.token);
                attachPaginationHrefs(positions, req.query);

                res.render('employeesList', {positions});
        }catch(error) {
                console.log(error);
                res.render('employeesList', {error});
        }
})



module.exports = router