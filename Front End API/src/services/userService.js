const { checkEmptyFields } = require('../helpers/validation');
const Service = require('./Service');

class EmployeeService extends Service {
    constructor() {
        super();
        this.endpoints = {
            'getAll':(query) =>  `/users?${query}`,
            'getById':(id) => `/users/${id}`,
            'main': `/users/`,
        }
    }

    getRoles = () => ['user','manager', 'admin'];
    checkNoLink = (input) => {
        if(input.noLink) {
            return input = {
                username: input.username,
                password: input.password,
                employeeId: null,
                role: input.role,
            } 
        }

        return input;
    }

    async add(input, token) {
        input = this.checkNoLink(input);
        checkEmptyFields(input);
        return await this.postReq(this.endpoints.main,input,token);
    }

    async edit(id,input, token) {
        input = this.checkNoLink(input);
        checkEmptyFields(input);
        return await this.putReq(this.endpoints.getById(id),input,token);
    }
    
    async changePassword(id,input, token) {
        if(input.password !== input.rePassword) throw new Error('Passwords don\'t match');
        checkEmptyFields(input);
        const payload = {password: input.password};
        return await this.putReq(this.endpoints.getById(id),payload,token);
    }


}

const employeeService = new EmployeeService();

module.exports = employeeService;