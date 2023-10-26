const Requester = require('./Requester');

class DepartmentService extends Requester {
    constructor() {
        super();
        this.endpoints = {
            'getAll' :(page) => `/departments?page=${page}`
        }
    }


    async getAll(page,token) {
        const departments = await this.getReq(this.endpoints.getAll(page), token);
        return departments;
    }

    
}

const departmentService = new DepartmentService();

module.exports = departmentService;