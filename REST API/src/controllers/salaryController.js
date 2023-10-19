const salaryService = require('../services/salaryService');
const errorHandler = require('../utilities/errorHandler');
const router = require('express').Router();

router.get('/', async (req, res) => {
    const results = await salaryService.getAll();
    return res.json(results)
})

router.get('/:id', async (req, res) => {
    try {
        const result = await salaryService.getById(req.params.id);
        return res.json(result);
    } catch (error) {
        console.log(error);
        res.status(400).json(errorHandler(error));
    }
});

router.post('/',async (req,res) => {
    const input = req.body;
    try {
        const newSalary = await salaryService.create(input);
        res.json(newSalary);
    } catch (error) {
        console.log(error);
        res.status(error.status || 400).json(errorHandler(error));
    }
});

router.put('/:id', async (req, res) => {
    const input = req.body;
    const id = req.params.id;
    try {
        const editedSalary = await salaryService.update(id, input);
        res.json(editedSalary)
    } catch (error) {
        console.log(error);
        res.status(error.status || 400).json(errorHandler(error));
    }
})

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        await salaryService.deleteById(id);
        res.status(204).json({})
    } catch (error) {
        console.log(error);
        res.status(error.status || 400).json(errorHandler(error));
    }
});


module.exports = router;