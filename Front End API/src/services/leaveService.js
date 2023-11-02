const { toQueryString } = require('../helpers/pagination');
const Requester = require('./Requester');

class LeaveService extends Requester {
    constructor() {
        super();
        this.endpoints = {
            'getAll' :(queryString) => `/leaves?${queryString}`,
            'getById' :(id) => `/leaves/${id}`,
            'resolve': (id,status) => `/leaves/${id}/${status}`,
            'main': '/leaves/'
        }
    }


    async getAll(query,token) {
        const queryString = toQueryString(query);
        const leaves = await this.getReq(this.endpoints.getAll(queryString), token);
        return leaves;
    }

    async resolve(id, status,token) {
        if(!id) return;
        return await this.getReq(this.endpoints.resolve(id,status), token)
    }

    async getById(id, token) {
        if(!id) return;
        return await this.getReq(this.endpoints.getById(id), token)
    }

    async edit(id, input, token) {
        if(!id) return;
        const leave = await this.putReq(this.endpoints.getById(id),input,token);
        return leave;
    }

    async add(input, token) {
        const leave = await this.postReq(this.endpoints.main,input,token);
        return leave;
    }
}

const leaveService = new LeaveService();

module.exports = leaveService;