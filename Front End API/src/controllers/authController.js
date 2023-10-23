const router = require('express').Router();
const authLayout = {layout: 'auth.hbs'}
router.get('/register',async (req, res) => {
        res.render('registerView',authLayout );
});

router.get(['/','/login'],async (req, res) => {
        res.render('loginView', authLayout);
});



module.exports = router