const departmentService = require('../services/departmentService');
const errorHandler = require('../utilities/errorHandler');
const router = require('express').Router();

router.get('/', async (req,res) => {
    const results =await departmentService.getAll();
    return res.json(results)
})

router.get('/:id',async (req,res) => {
    try {
        const result = await departmentService.getById(req.params.id);
        return res.json(result);
    } catch (error) {
        console.log(error);
        res.status(400).json(errorHandler(error));
    }
})

router.post('/',async (req,res) => {
    const input = req.body;
    console.log(input.name);
    try {
        const newDepartment = await departmentService.create(input);
        res.json(newDepartment);
    } catch (error) {
        console.log(error);
        res.status(error.status || 400).json(errorHandler(error));
    }
})

router.put('/:id',async (req,res) => {
    const input = req.body;
    const id = req.params.id;
    try {
        const editedDepartment = await departmentService.update(id, input);
        res.json(editedDepartment)
    } catch (error) {
        console.log(error);
        res.status(error.status || 400).json(errorHandler(error));
    }
})


router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        await departmentService.deleteById(id);
        res.status(204).json({})
    } catch (error) {
        console.log(error);
        res.status(error.status || 400).json(errorHandler(error));
    }
});

module.exports = router;

