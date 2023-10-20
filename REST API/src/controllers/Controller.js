const errorHandler = require('../utilities/errorHandler');

class Controller {
    constructor(service) {
        this.service = service;
    }

    errorResponse = (resBody, error) => {
        console.log(error);
        return resBody.status(error.status || 400).json(errorHandler(error));
    }

    getAll = async (req, res) => {
        const user = req.user
        try {
            const results = await this.service.getAll(user);
            return res.json(results);
        } catch (error) {
            this.errorResponse(res, error)
        }
    }

    getById = async (req, res) => {
        const entityId = req.params.id;
        const user = req.user
        try {
            const result = await this.service.getById(entityId, user);
            return res.json(result);
        } catch (error) {
            this.errorResponse(res,error)
        }
    }

    create = async (req, res) => {
        const input = req.body;
        const user = req.user;
        try {
            const newEntity = await this.service.create(input, user);
            res.status(201).json(newEntity);
        } catch (error) {
            this.errorResponse(res,error)
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
            this.errorResponse(res,error)
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
                this.errorResponse(res, error);
            }
        } else {
            return res.status(401).json({ message: "Unauthorized" })
        }


    }
}

module.exports = Controller;