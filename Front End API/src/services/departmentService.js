const Service = require('./Service');

class DepartmentService extends Service {
    constructor() {
        super();
        this.endpoints = {
            'getAll' :(query) => `/departments?${query}`,
            'getById':(id) => `/departments/${id}`,
            'main': '/departments/'
        }
    }

}

const departmentService = new DepartmentService();

module.exports = departmentService;