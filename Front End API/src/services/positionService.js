const { toQueryString } = require('../helpers/pagination');
const Requester = require('./Requester');

class PositionService extends Requester {
    constructor() {
        super();
        this.endpoints = {
            'getById':(id) => `/positions/${id}`,
            'getPrevPositions' : (id) => `/positions?employee=${id}&active=false`,
            'getAll' :(query) =>  `/positions?active=true&${query}`,
            'totalActiveInDepartment' : (departmentId) => `/positions/total?active=true&departmentId=${departmentId}`
        }
    }

    async getById(id,token) {
        const activePosition = await this.getReq(this.endpoints.getById(id),token);
        return activePosition;
    }

    async getPrevPositions(id,token) {
        const prevPositions = await this.getReq(this.endpoints.getPrevPositions(id),token);
        return prevPositions.results;
    }

    async getAll(query,token) {
        const queryString = toQueryString(query);
        const positions = await this.getReq(this.endpoints.getAll(queryString), token);
        return positions;
    }

    async totalActiveInDepartment(departmentId,token) {
        const positions = await this.getReq(this.endpoints.totalActiveInDepartment(departmentId), token);
        return positions;
    }
}

const positionService = new PositionService();

module.exports = positionService;