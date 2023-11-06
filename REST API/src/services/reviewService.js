const { QUERY_DEFAULTS } = require("../config/constants");
const Review = require("../models/PerformanceReview");
const CustomError = require("../utilities/CustomError");
const isAuthorizedUser = require("../utilities/isAuthorizedUser");
const Service = require("./Service");

class ReviewService extends Service {
  constructor() {
    super(Review);
  }

  async getAll(query, user) {
    const queryObj = this.formatQuery(query);
    if(queryObj.search && user.role !== 'user') return await this.employeeRefNameSearch(queryObj)

  // User limited access(only own reviews)
  if (user.role === 'user') queryObj.filters.employeeId = user.employeeId
  
  return await this.querySearch(queryObj);
  }

  async getById(reviewId, user) {
    const review = await this.model.findById(reviewId);
    if (!isAuthorizedUser(user.role, user.employeeId, review.employeeId)) {
      throw new CustomError('Unauthorized: Users can access only their own reviews', 401)
    }
    return await review;
  }

}
module.exports = new ReviewService()
