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
            const query = req.query
            const results = await this.service.getAll(query,user);
            return res.json(results);
        } catch (error) {
            this.errorResponse(res, error);
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
            const updatedEntity = await this.service.update(input, id, user);
            res.json(updatedEntity);
        } catch (error) {
            this.errorResponse(res, error)
        }
    }

    delete = async (req, res) => {
        if (req.user.role === 'admin') {
            try {
                const id = req.params.id;
                const adminId = req.user._id
                await this.service.deleteById(id, adminId);
                res.status(204).end()
            } catch (error) {
                this.errorResponse(res, error);
            }
        } else {
            return res.status(401).json({ message: "Unauthorized" })
        }
    }

    count = async (req, res) => {
        try {
            const totalEntities = await this.service.countDocs(req.query);
            res.json(totalEntities);
        }catch(error) {
            this.errorResponse(res, error);
        }
    }
}

module.exports = Controller;