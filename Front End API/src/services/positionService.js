const { checkEmptyFields } = require('../helpers/validation');
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

    async add(employeeId,input, token) {
        checkEmptyFields(input);
        input.employeeId = employeeId;
        return await this.postReq(this.endpoints.main,input,token);
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

    async endContract(id,token) {
        if(!id) return;
        const position = await this.getReq(this.endpoints.getById(id),token);
        console.log(position);
        position.active = false;
        position.endDate = Date.now();
        return await this.putReq(this.endpoints.getById(id),position,token);
    }

}

const positionService = new PositionService();

module.exports = positionService;