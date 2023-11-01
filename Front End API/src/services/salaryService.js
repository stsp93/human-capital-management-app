const { toQueryString } = require('../helpers/pagination');
const { checkEmptyFields } = require('../helpers/validation');
const Requester = require('./Requester');

class SalaryService extends Requester {
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


    async getAll(query,token) {
        const queryString = toQueryString(query);
        console.log(queryString);
        const salary = await this.getReq(this.endpoints.getAll(queryString), token);
        return salary;
    }

    async getById(id,token) {
        if(!id) return;
        const salary= await this.getReq(this.endpoints.getById(id), token);
        return salary
    }

    async edit(id, input, token) {
        if(!id) return;
        const salary = await this.putReq(this.endpoints.getById(id),input,token);
        return salary;
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