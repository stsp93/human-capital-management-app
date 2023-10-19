const errorHandler = require('../utilities/errorHandler');

class Controller {
    constructor(service) {
        this.service = service;
    }

    getAll = async (req, res) => {
        try {
            const results = await this.service.getAll();
            return res.json(results);
        } catch (error) {
            console.log(error);
            res.status(400).json(errorHandler(error));
        }
    }

    getById = async (req, res) => {
        try {
            const result = await this.service.getById(req.params.id);
            return res.json(result);
        } catch (error) {
            console.log(error);
            res.status(400).json(errorHandler(error));
        }
    }

    create = async (req, res) => {
        const input = req.body;
        try {
            const newEntity = await this.service.create(input);
            res.status(201).json(newEntity);
        } catch (error) {
            console.log(error);
            res.status(error.status || 400).json(errorHandler(error));
        }
    }

    update = async (req, res) => {
        const input = req.body;
        const id = req.params.id;
        const user = req.user;
        try {
            const updatedEntity = await this.service.update(id, input, user);
            res.json(updatedEntity);
        } catch (error) {
            console.log(error);
            res.status(error.status || 400).json(errorHandler(error));
        }
    }

    delete = async (req, res) => {
        // Only admins can delete
        if (req.user.role === 'admin') {
            const id = req.params.id;
            try {
                await this.service.deleteById(id);
                res.status(204).json({});
            } catch (error) {
                console.log(error);
                res.status(error.status || 400).json(errorHandler(error));
            }
        } else {
            return res.status(401).json({ message: "Unauthorized" })
        }


    }
}

module.exports = Controller;