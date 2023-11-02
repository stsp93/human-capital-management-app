const { toQueryString } = require('../helpers/pagination');
const { checkEmptyFields } = require('../helpers/validation');
const Requester = require('./Requester');

class ReviewService extends Requester {
    constructor() {
        super();
        this.endpoints = {
            'getAll' :(query) => `/reviews?${query}`,
            'getById': (id) => `/reviews/${id}`,
            'main': '/reviews/'
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
        checkEmptyFields(input);
        if(!id) return;
        const review = await this.putReq(this.endpoints.getById(id),input,token);
        return review;
    }

    async add( input, token) {
        checkEmptyFields(input);
        const review = await this.postReq(this.endpoints.main,input,token);
        return review;
    }
}

const reviewService = new ReviewService();

module.exports = reviewService;