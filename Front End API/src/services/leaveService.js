const Requester = require('./Requester');

class LeaveService extends Requester {
    constructor() {
        super();
        this.endpoints = {
            'getAll' :(page) => `/leaves?page=${page}`
        }
    }


    async getAll(page,token) {
        const leaves = await this.getReq(this.endpoints.getAll(page), token);
        return leaves;
    }

    
}

const leaveService = new LeaveService();

module.exports = leaveService;