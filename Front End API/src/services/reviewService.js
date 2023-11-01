const { toQueryString } = require('../helpers/pagination');
const Requester = require('./Requester');

class ReviewService extends Requester {
    constructor() {
        super();
        this.endpoints = {
            'getAll' :(query) => `/reviews?${query}`,
            'getById': (id) => `/reviews/${id}`
        }
    }


    async getAll(query,token) {
        const queryString = toQueryString(query);
        console.log(queryString);
        const reviews = await this.getReq(this.endpoints.getAll(queryString), token);
        return reviews;
    }

    async getById(id,token) {
        if(!id) return;
        const review= await this.getReq(this.endpoints.getById(id), token);
        return review
    }

    async edit(id, input, token) {
        if(!id) return;
        const review = await this.putReq(this.endpoints.getById(id),input,token);
        return review;
    }
}

const reviewService = new ReviewService();

module.exports = reviewService;