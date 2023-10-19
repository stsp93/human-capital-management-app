const Review = require("../models/PerformanceReview");
const Service = require("./Service");

class ReviewService extends Service {
    constructor() {
      super(Review);
    }
}
module.exports = new ReviewService()
