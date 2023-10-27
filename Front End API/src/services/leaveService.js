const { toQueryString } = require('../helpers/pagination');
const Requester = require('./Requester');

class LeaveService extends Requester {
    constructor() {
        super();
        this.endpoints = {
            'getAll' :(queryString) => `/leaves?${queryString}`,
            'getById' :(id) => `/leaves/${id}`,
            'resolve': (id,status) => `/leaves/${id}/${status}`
        }
    }


    async getAll(query,token) {
        const queryString = toQueryString(query);
        const leaves = await this.getReq(this.endpoints.getAll(queryString), token);
        return leaves;
    }

    async resolve(id, status,token) {
        return await this.getReq(this.endpoints.resolve(id,status), token)
    }

    async getById(id, token) {
        return await this.getReq(this.endpoints.getById(id), token)
    }
}

const leaveService = new LeaveService();

module.exports = leaveService;