const Review = require("../models/PerformanceReview");
const CustomError = require("../utilities/CustomError");
const isAuthorizedUser = require("../utilities/isAuthorizedUser");
const Service = require("./Service");

class ReviewService extends Service {
    constructor() {
      super(Review);
    }

    async getAll(query, user) {
      if(user.role === 'user') {
        return await this.model.find({employeeId: user.employeeId}).populate('employeeId reviewerId');
      }
      return await this.model.find(query).populate('employeeId reviewerId');
    }

    async getById(reviewId, user) {
      const review = await this.model.findById(reviewId);
      if(!isAuthorizedUser(user.role, user.employeeId, review.employeeId)) {
        throw new CustomError('Unauthorized: Users can access only their own reviews', 401)
      }
      return await review.populate('employeeId reviewerId');
    }
}
module.exports = new ReviewService()
