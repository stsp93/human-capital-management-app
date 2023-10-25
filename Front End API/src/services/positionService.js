const Requester = require('./Requester');

class EmployeeService extends Requester {
    constructor() {
        super();
        this.endpoints = {
            'getById':(id) => `/positions/${id}`,
            'getPrevPositions' : (id) => `/positions?employee=${id}`,
        }
    }

    async getById(id,token) {
        const activePosition = await this.getReq(this.endpoints.getById(id),token);
        return activePosition;
    }

    async getPrevPositions(id,token) {
        const prevPositions = await this.getReq(this.endpoints.getPrevPositions(id),token);
        return prevPositions;
    }

    
}

const employeeService = new EmployeeService();

module.exports = employeeService;