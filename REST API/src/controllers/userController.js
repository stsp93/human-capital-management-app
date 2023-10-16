const userService = require('../services/userService');
const router = require('express').Router();


router.post('/register', async (req, res) => {
    try {
        const user = await userService.register(req.body);
        res.status(201).json(user)
    } catch (error) {
        console.log(error);
    }
})

router.post('/login', async (req, res) => {
    try {
        const user = await userService.login(req.body);
        return res.json(user)
    } catch (error) {
        console.log(error);
    }
})

router.get('/logout', (req, res) => {
    userService.logout(req.token);
    res.status(204).end();
})

module.exports = router;