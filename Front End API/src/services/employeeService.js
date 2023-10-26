const Requester = require('./Requester');

class EmployeeService extends Requester {
    constructor() {
        super();
        this.endpoints = {
            'getById':(id) => `/employees/${id}`,
        }
    }

    async getById(id,token) {
        const user = await this.getReq(this.endpoints.getById(id),token);
        return user;
    }
    
}

const employeeService = new EmployeeService();

module.exports = employeeService;