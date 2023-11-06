const authService = require('../services/authService');
const router = require('express').Router();
const authLayout = { layout: 'auth.hbs' }



const showRegister = async (req, res) => {
        res.render('registerView', authLayout);
};
const showLogin = async (req, res) => {
        res.render('loginView', authLayout);
};

const register = async (req, res) => {
        const input = req.body;
        try {
                const newUser = await authService.register(input);
                res.cookie('session', newUser.token, { httpOnly: true });
                res.status(201).redirect(`/users/${newUser._id}/details`);
        } catch (error) {
                console.log(error);
                res.status(error.status || 400).render('registerView', { ...authLayout, error, input });
        }
};

const login = async (req, res) => {
        const input = req.body;
        try {
                const user = await authService.login(input);
                res.cookie('session', user.token, { httpOnly: true });
                res.status(201).redirect(`/users/${user._id}/details`);
        } catch (error) {
                console.log(error);
                res.status(error.status || 400).render('loginView', { ...authLayout, error, input });
        }
};

const logout = async (req, res) => {

        await authService.logout(req.token);
        res.clearCookie('session');
        res.redirect('/');

}

router.get('/register', showRegister)
router.get('/login', showLogin)
router.post('/register', register)
router.post('/login', login)
router.get('/logout', logout);

module.exports = router