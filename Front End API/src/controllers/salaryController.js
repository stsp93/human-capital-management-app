const positionService = require('../services/positionService');
const salaryService = require('../services/salaryService');
const router = require('express').Router();


router.get('/:id/edit', async (req, res) => {
        try {
                const salary = await salaryService.getById(req.params.id, req.token);
                console.log(salary.bonuses[0]);
                const currencies = ['USD', "BGN", "EUR"];
                res.render('forms/salaryEdit', { salary , currencies});
        } catch (error) {
                console.log(error);
                res.render('forms/salaryEdit', { error });
        }
})

router.post('/:id/edit', async (req, res) => {
        try {
                const salary = await salaryService.edit(req.params.id, req.body, req.token);
                const position = await positionService.getAll({salaryId: salary._id}, req.token);
                const employeeId = position.results[0].employeeId;
                res.redirect(`/positions/${employeeId}/edit`);
        } catch (error) {
                console.log(error);
                res.render('forms/salaryEdit', { error, input: req.body });
        }
})

router.post('/:id/addBonus', async (req, res) => {
    try {
            const salary = await salaryService.addBonus(req.params.id, req.body, req.token);
            res.redirect(`/salary/${req.params.id}/edit`);
    } catch (error) {
            console.log(error);
            res.redirect(`/salary/${req.params.id}/edit`, { error, input: req.body });
    }
})

router.get('/:id/removeBonus', async (req, res) => {
    try {
            const bonusId = req.query.bonusId
            await salaryService.removeBonus(req.params.id,bonusId, req.token);
            res.redirect(`/salary/${req.params.id}/edit`);
    } catch (error) {
            console.log(error);
            res.redirect(`/salary/${req.params.id}/edit`, { error, input: req.body });
    }
})


module.exports = router;