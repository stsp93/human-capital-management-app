const { toQueryString } = require('../helpers/pagination');
const Requester = require('./Requester');

class EmployeeService extends Requester {
    constructor() {
        super();
        this.endpoints = {
            'getAll':(query) =>  `/employees?${query}`,
            'getById':(id) => `/employees/${id}`,
        }
    }

    async getById(id,token) {
        const employee = await this.getReq(this.endpoints.getById(id),token);
        return employee;
    }
    async getAll(query,token) {
        const queryString = toQueryString(query)
        const employees = await this.getReq(this.endpoints.getAll(queryString),token);
        return employees;
    }

    
}

const employeeService = new EmployeeService();

module.exports = employeeService;