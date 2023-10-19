const leavesService = require('../services/leavesService');
const errorHandler = require('../utilities/errorHandler');
const router = require('express').Router();

router.get('/', async (req, res) => {
    const results = await leavesService.getAll();
    return res.json(results)
})

router.get('/:id', async (req, res) => {
    try {
        const result = await leavesService.getById(req.params.id);
        return res.json(result);
    } catch (error) {
        console.log(error);
        res.status(400).json(errorHandler(error));
    }
});

router.post('/',async (req,res) => {
    const input = req.body;
    try {
        const newLeave = await leavesService.create(input);
        res.json(newLeave);
    } catch (error) {
        console.log(error);
        res.status(error.status || 400).json(errorHandler(error));
    }
});

router.put('/:id', async (req, res) => {
    const input = req.body;
    const id = req.params.id;
    try {
        const editedLeave = await leavesService.update(id, input);
        res.json(editedLeave)
    } catch (error) {
        console.log(error);
        res.status(error.status || 400).json(errorHandler(error));
    }
})

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        await leavesService.deleteById(id);
        res.status(204).json({})
    } catch (error) {
        console.log(error);
        res.status(error.status || 400).json(errorHandler(error));
    }
});


module.exports = router;