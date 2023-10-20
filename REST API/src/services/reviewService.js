const Review = require("../models/PerformanceReview");
const CustomError = require("../utilities/CustomError");
const isAuthorizedUser = require("../utilities/isAuthorizedUser");
const Service = require("./Service");

class ReviewService extends Service {
    constructor() {
      super(Review);
    }

    async getAll(user) {
      if(user.role === 'user') {
        return await this.model.find({revieweeId: user.employeeId});
      }
      return await this.model.find();
    }

    async getById(reviewId, user) {
      const review = await this.model.findById(reviewId);
      if(!isAuthorizedUser(user.role, user.employeeId, review.revieweeId)) {
        throw new CustomError('Unauthorized: Users can access only their own reviews', 401)
      }
      return review;
    }
}
module.exports = new ReviewService()
