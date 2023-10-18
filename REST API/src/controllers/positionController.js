const positionService = require('../services/positionService');
const errorHandler = require('../utilities/errorHandler');
const router = require('express').Router();

router.get('/', async (req, res) => {
    const results = await positionService.getAll();
    return res.json(results)
})

router.get('/:id', async (req, res) => {
    try {
        const result = await positionService.getById(req.params.id);
        return res.json(result);
    } catch (error) {
        console.log(error);
        res.status(400).json(errorHandler(error));
    }
});

router.post('/',async (req,res) => {
    const input = req.body;
    try {
        const newPosition = await positionService.create(input);
        res.json(newPosition);
    } catch (error) {
        console.log(error);
        res.status(error.status || 400).json(errorHandler(error));
    }
});

router.put('/:id', async (req, res) => {
    const input = req.body;
    const id = req.params.id;
    try {
        const editedPosition = await positionService.update(id, input);
        res.json(editedPosition)
    } catch (error) {
        console.log(error);
        res.status(error.status || 400).json(errorHandler(error));
    }
})

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        await positionService.deleteById(id);
        res.status(204).json({})
    } catch (error) {
        console.log(error);
        res.status(error.status || 400).json(errorHandler(error));
    }
});


module.exports = router;