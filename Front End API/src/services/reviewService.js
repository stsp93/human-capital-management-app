const Service = require('./Service');

class ReviewService extends Service {
    constructor() {
        super();
        this.endpoints = {
            'getAll': (query) => `/reviews?${query}`,
            'getById': (id) => `/reviews/${id}`,
            'main': '/reviews/'
        }
    }

    getRatings = () => {
        const ratings = []
        for (let i = 0; i < 10; i++) {
            ratings[i] = i + 1;
        }

        return ratings;
    }
}

const reviewService = new ReviewService();

module.exports = reviewService;