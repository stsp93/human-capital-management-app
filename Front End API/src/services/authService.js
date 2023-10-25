const Requester = require('./Requester');

class UserService extends Requester {
    constructor() {
        super();
        this.endpoints = {
            'register': '/users/register',
            'login': '/users/login',
            'logout': '/users/logout',
        }
    }

    checkInput(input) {
        if(Object.values(input).some(v => v==='')) {
            throw new Error('Please fill all fields');
        }
    }

    async login(input) {
        this.checkInput(input);

        const user = await this.postReq(this.endpoints.login, input);
        return user;
    }
    
    async register(input) {
        this.checkInput(input);

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