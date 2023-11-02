const { toQueryString } = require('../helpers/pagination');
const { checkEmptyFields } = require('../helpers/validation');
const Requester = require("./Requester");

class Service extends Requester{
    constructor() {
        super();
    }

    async getAll(query,token) {
        const queryString = toQueryString(query)
        return await this.getReq(this.endpoints.getAll(queryString), token);
    }

    async getById(id, token) {
        if(!id) return;
        return await this.getReq(this.endpoints.getById(id), token)
    }

    async edit(id, input, token) {
        checkEmptyFields(input);
        if(!id) return;
        return  await this.putReq(this.endpoints.getById(id),input,token);
        
    }

    async add(input, token) {
        checkEmptyFields(input)
        return await this.postReq(this.endpoints.main,input,token);
    }

    async remove(id, token) {
        if(!id) return;
        return await this.deleteReq(this.endpoints.getById(id),token);
    }
}


module.exports = Service;