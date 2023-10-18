const employeeService = require('../services/employeeService');
const errorHandler = require('../utilities/errorHandler');
const router = require('express').Router();

router.get('/', async (req, res) => {
    const results = await employeeService.getAll();
    return res.json(results)
})

router.get('/:id',async (req,res) => {
    try {
        const result = await employeeService.getById(req.params.id);
        return res.json(result);
    } catch (error) {
        console.log(error);
        res.status(400).json(errorHandler(error));
    }
})

router.put('/:id',async (req,res) => {
    const input = req.body;
    const id = req.params.id;
    try {
        const editedEmployee = await employeeService.update(id, input);
        res.json(editedEmployee)
    } catch (error) {
        console.log(error);
        res.status(error.status || 400).json(errorHandler(error));
    }
})

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        await employeeService.deleteById(id);
        res.status(204).json({})
    } catch (error) {
        console.log(error);
        res.status(error.status || 400).json(errorHandler(error));
    }
});


module.exports = router;