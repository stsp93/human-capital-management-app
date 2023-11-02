const { toQueryString } = require('../helpers/pagination');
const { checkEmptyFields } = require('../helpers/validation');
const Service = require('./Service');

class ReviewService extends Service {
    constructor() {
        super();
        this.endpoints = {
            'getAll' :(query) => `/reviews?${query}`,
            'getById': (id) => `/reviews/${id}`,
            'main': '/reviews/'
        }
    }

}

const reviewService = new ReviewService();

module.exports = reviewService;