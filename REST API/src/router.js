const router = require('express').Router();

const userController = require('./controllers/userController');


router.use('/', (req, res) => {
    res.json(['Hello World']);
});

router.use('/users', userController)


module.exports = router
