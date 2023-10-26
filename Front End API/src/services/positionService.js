const Requester = require('./Requester');

class PositionService extends Requester {
    constructor() {
        super();
        this.endpoints = {
            'getById':(id) => `/positions/${id}`,
            'getPrevPositions' : (id) => `/positions?employee=${id}&active=false`,
            'getAll' :(query) =>  `/positions?active=true&${query}`
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
        const queryString = Object.entries(query).map(q => q[0]+'='+q[1]).join('&');
        const positions = await this.getReq(this.endpoints.getAll(queryString), token);
        return positions;
    }

    
}

const positionService = new PositionService();

module.exports = positionService;