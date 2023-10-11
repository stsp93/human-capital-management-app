const router = require('express').Router();


router.use('/', (req, res) => {
    res.json(['Hello World']);
});


module.exports = router
