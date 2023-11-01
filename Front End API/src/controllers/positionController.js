const departmentService = require('../services/departmentService');
const employeeService = require('../services/employeeService');
const positionService = require('../services/positionService');
const salaryService = require('../services/salaryService');
const router = require('express').Router();



const showEdit = async (req, res) => {
    try {
            const position = await positionService.getById(req.params.id, req.token);
            const employee = await employeeService.getById(position.employeeId, req.token);
            const departments = await departmentService.getAll({limit:0}, req.token);
            const salary = await salaryService.getById(position.salaryId, req.token);
            res.render('forms/positionEdit', {position, departments ,employee, salary});
    }catch(error) {
            console.log(error);
            res.render('forms/positionEdit', {error});
    }
}

const edit=  async (req, res) => {
    try {
            const position = await positionService.edit(req.params.id,req.body, req.token)
            res.redirect(`/employee/${position.employeeId}`)
    }catch(error) {
            console.log(error);
            res.render('forms/positionEdit', {error,position:req.body});
    }
}

router.get('/:id/edit',showEdit) ;
router.post('/:id/edit',edit);

module.exports = router