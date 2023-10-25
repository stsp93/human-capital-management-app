const employeeService = require('../services/employeeService');
const positionService = require('../services/positionService');
const router = require('express').Router();



router.get('/profile', async (req, res) => {
        try {
                const profile = await employeeService.getById(req.user.employeeId, req.token);
                const activePosition = await positionService.getById(req.user.employeeId, req.token);
                const prevPositions = await positionService.getPrevPositions(req.user.employeeId, req.token);
                profile.activePosition = activePosition;
                profile.prevPositions = prevPositions;
                
                // Check if allowed to edit info
                if(req.user.role !== 'user' || req.user.employeeId === profile._id) {
                        profile.allowEdit = true;
                }

                res.render('employeeDetailsView', {employee: profile});
        }catch(error) {
                console.log(error);
                if(error.status === 401) res.redirect('/auth/login');
        }
        
});



module.exports = router