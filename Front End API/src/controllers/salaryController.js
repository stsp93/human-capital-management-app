const { requireRoles } = require('../middlewares/authMiddleware');
const positionService = require('../services/positionService');
const salaryService = require('../services/salaryService');
const router = require('express').Router();


const showEdit = async (req, res) => {
        try {
                const salary = await salaryService.getById(req.params.id, req.token);
                const currencies = ['USD', "BGN", "EUR"];
                res.render('forms/salaryEdit', { salary , currencies});
        } catch (error) {
                console.log(error);
                res.render('forms/salaryEdit', { error });
        }
}

const edit = async (req, res) => {
        try {
                const salary = await salaryService.edit(req.params.id, req.body, req.token);
                const position = await positionService.getAll({salaryId: salary._id}, req.token);
                const employeeId = position.results[0].employeeId;
                res.redirect(`/positions/${employeeId}/edit`);
        } catch (error) {
                console.log(error);
                res.render('forms/salaryEdit', { error, input: req.body });
        }
}

const addBonus = async (req, res) => {
    try {
            const salary = await salaryService.addBonus(req.params.id, req.body, req.token);
            res.redirect(`/salary/${req.params.id}/edit`);
    } catch (error) {
            console.log(error);
            res.redirect(`/salary/${req.params.id}/edit`);
    }
}

const removeBonus = async (req, res) => {
    try {
            const salary =await salaryService.getById(req.params.id, req.token);
            const bonusId = req.query.bonusId
            await salaryService.removeBonus(req.params.id,bonusId, req.token);
            res.redirect(`/salary/${req.params.id}/edit`);
    } catch (error) {
            console.log(error);
            res.redirect(`/salary/${req.params.id}/edit`);
    }
}
// manager access
router.use(requireRoles('manager', 'admin'));
router.get('/:id/edit',showEdit) 
router.post('/:id/edit',edit) 
router.post('/:id/addBonus',addBonus) 

// admin access
router.get('/:id/removeBonus',requireRoles('admin'),removeBonus) 

module.exports = router;