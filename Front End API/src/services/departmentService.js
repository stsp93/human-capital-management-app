const { toQueryString } = require('../helpers/pagination');
const { checkEmptyFields } = require('../helpers/validation');
const Requester = require('./Requester');

class DepartmentService extends Requester {
    constructor() {
        super();
        this.endpoints = {
            'getAll' :(query) => `/departments?${query}`,
            'getById':(id) => `/departments/${id}`,
            'main': '/departments/'
        }
    }

    async getAll(query,token) {
        const queryString = toQueryString(query)
        const departments = await this.getReq(this.endpoints.getAll(queryString), token);
        return departments;
    }

    async getById(id,token) {
        if(!id) return;
        const department = await this.getReq(this.endpoints.getById(id),token);
        return department;
    }

    async edit(id, input, token) {
        checkEmptyFields(input);
        if(!id) return;
        const department = await this.putReq(this.endpoints.getById(id),input,token);
        return department;
    }
    async add(input, token) {
        checkEmptyFields(input);
        const department = await this.postReq(this.endpoints.main,input,token);
        return department;
    }
}

const departmentService = new DepartmentService();

module.exports = departmentService;