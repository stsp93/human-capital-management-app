const Requester = require('./Requester');

class DepartmentService extends Requester {
    constructor() {
        super();
        this.endpoints = {
            'getAll' :(page) => `/departments?page=${page}`,
            'getById':(id) => `/departments/${id}`,
        }
    }


    async getAll(page,token) {
        const departments = await this.getReq(this.endpoints.getAll(page), token);
        return departments;
    }

    async getById(id,token) {
        const department = await this.getReq(this.endpoints.getById(id),token);
        return department;
    }

}

const departmentService = new DepartmentService();

module.exports = departmentService;