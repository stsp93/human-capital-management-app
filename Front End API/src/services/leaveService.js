const { toQueryString } = require('../helpers/pagination');

const Service = require('./Service');

class LeaveService extends Service {
    constructor() {
        super();
        this.endpoints = {
            'getAll' :(queryString) => `/leaves?${queryString}`,
            'getById' :(id) => `/leaves/${id}`,
            'resolve': (id,status) => `/leaves/${id}/${status}`,
            'main': '/leaves/'
        }
    }
    async resolve(id, status,token) {
        if(!id) return;
        return await this.getReq(this.endpoints.resolve(id,status), token)
    }
}

const leaveService = new LeaveService();

module.exports = leaveService;