const { toQueryString } = require('../helpers/pagination');
const Service = require('./Service');

class SalaryService extends Service {
    constructor() {
        super();
        this.endpoints = {
            'getAll' :(query) => `/salary?${query}`,
            'getById': (id) => `/salary/${id}`,
            'addBonus': (bonusId) => `/salary/${bonusId}/addBonus`,
            'removeBonus': (salaryId,bonusId) =>  `/salary/${salaryId}/removeBonus?bonusId=${bonusId}`,
            'main': `/salary/`
        }
    }

    async addBonus(bonusId,input, token) {
        if(!bonusId) return;
        return await this.postReq(this.endpoints.addBonus(bonusId), input, token)

    }
    async removeBonus(salaryId,bonusId, token) {
        if(!bonusId) return;
        return await this.deleteReq(this.endpoints.removeBonus(salaryId,bonusId),token )
    }
}

const salaryervice = new SalaryService();

module.exports = salaryervice;