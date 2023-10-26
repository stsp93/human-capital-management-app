const Requester = require('./Requester');

class LeaveService extends Requester {
    constructor() {
        super();
        this.endpoints = {
            'getAll' :(page) => `/leaves?page=${page}`,
            'resolve': (id,status) => `/leaves/${id}/${status}`
        }
    }


    async getAll(page,token) {
        const leaves = await this.getReq(this.endpoints.getAll(page), token);
        return leaves;
    }

    async resolve(id, status,token) {
        return await this.getReq(this.endpoints.resolve(id,status), token)
    }
}

const leaveService = new LeaveService();

module.exports = leaveService;