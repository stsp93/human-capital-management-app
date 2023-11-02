const { toQueryString } = require('../helpers/pagination');
const Service = require('./Service');

class PositionService extends Service {
    constructor() {
        super();
        this.endpoints = {
            'getById':(id) => `/positions/${id}`,
            'getPrevPositions' : (id) => `/positions?employeeId=${id}&active=false`,
            'getAll' :(query) =>  `/positions?active=true&${query}`,
            'totalActiveInDepartment' : (departmentId) => `/positions/total?active=true&departmentId=${departmentId}`,
            'main': `/positions/`
        }
    }


    async getPrevPositions(id,token) {
        if(!id) return;
        const prevPositions = await this.getReq(this.endpoints.getPrevPositions(id),token);
        return prevPositions.results;
    }


    async totalActiveInDepartment(departmentId,token) {
        if(!departmentId) return;
        const positions = await this.getReq(this.endpoints.totalActiveInDepartment(departmentId), token);
        return positions;
    }

}

const positionService = new PositionService();

module.exports = positionService;