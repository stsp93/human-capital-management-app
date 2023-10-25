const authService = require('../services/authService');
const router = require('express').Router();
const authLayout = { layout: 'auth.hbs' }



router.get('/register', async (req, res) => {
        res.render('registerView', authLayout);
});

router.get('/login', async (req, res) => {
        res.render('loginView', authLayout);
});

router.post('/register', async (req, res) => {
        const input = req.body;
        try {
                const newUser = await authService.register(input);
                res.cookie('session', newUser.token, { httpOnly: true });
                res.status(201).redirect('/employees/profile');
        } catch (error) {
                console.log(error);
                res.status(error.status || 400).render('registerView', { ...authLayout, error, input });
        }
});

router.post('/login', async (req, res) => {
        const input = req.body;
        try {
                const user = await authService.login(input);
                res.cookie('session', user.token, { httpOnly: true });
                res.status(201).redirect('/employees/profile');
        } catch (error) {
                console.log(error);
                res.status(error.status || 400).render('loginView', { ...authLayout, error, input });
        }
});

router.get('/logout', async (req, res) => {

        await authService.logout(req.token);
        res.clearCookie('session');
        res.redirect('/');

})

module.exports = router