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
        try {
            const user = req.user
            const results = await this.service.getAll(user);
            return res.json(results);
        } catch (error) {
            this.errorResponse(res, error)
        }
    }
    getById = async (req, res) => {
        try {
            const entityId = req.params.id;
            const user = req.user
            const result = await this.service.getById(entityId, user);
            return res.json(result);
        } catch (error) {
            this.errorResponse(res, error)
        }
    }
    create = async (req, res) => {
        try {
            const input = req.body;
            const user = req.user;
            const newEntity = await this.service.create(input, user);
            res.status(201).json(newEntity);
        } catch (error) {
            this.errorResponse(res, error)
        }
    }

    update = async (req, res) => {
        try {
            const input = req.body;
            const id = req.params.id;
            const user = req.user;
            const updatedEntity = await this.service.update(id, input, user);
            res.json(updatedEntity);
        } catch (error) {
            this.errorResponse(res, error)
        }
    }

    delete = async (req, res) => {
        // Only admins can delete
        if (req.user.role === 'admin') {
            try {
                const id = req.params.id;
                // Prevent deleting own admin account
                if(req.user._id === id) return res.status(401).json({ message: "You can\'t delete your user account" })

                // delete entity
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