const { checkEmptyFields } = require('../helpers/validation');
const Service = require('./Service');

class UserService extends Service {
    constructor() {
        super();
        this.endpoints = {
            'register': '/users/register',
            'login': '/users/login',
            'logout': '/users/logout',
        }
    }


    async login(input) {
        checkEmptyFields(input);

        const user = await this.postReq(this.endpoints.login, input);
        return user;
    }
    
    async register(input) {
        checkEmptyFields(input);

        if (input.password !== input.rePassword) throw new Error('Passwords don\'t match');
        const user = await this.postReq(this.endpoints.register, input);
        return user;
    }
    
    async logout(token) {
        const res = await this.getReq(this.endpoints.logout, token);
        return res;
    }
    
}

const userService = new UserService();

module.exports = userService;