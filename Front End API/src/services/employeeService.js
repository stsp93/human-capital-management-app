const { toQueryString } = require('../helpers/pagination');
const { checkEmptyFields } = require('../helpers/validation');
const Service = require('./Service');

class EmployeeService extends Service {
    constructor() {
        super();
        this.endpoints = {
            'getAll':(query) =>  `/employees?${query}`,
            'getById':(id) => `/employees/${id}`,
            'main': `/employees/`,
        }
    }
}

const employeeService = new EmployeeService();

module.exports = employeeService;