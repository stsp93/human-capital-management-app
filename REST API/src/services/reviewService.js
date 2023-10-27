const Review = require("../models/PerformanceReview");
const CustomError = require("../utilities/CustomError");
const isAuthorizedUser = require("../utilities/isAuthorizedUser");
const Service = require("./Service");

class ReviewService extends Service {
  constructor() {
    super(Review);
  }

  async getAll(query, user) {
    let { page = 1, limit = 5, sort = '_id', order = 'asc', ...filters } = query;
    const pagination = this.createPagination(page,limit,sort);
    let results
    if (user.role === 'user') {
      results = await this.model.find({ employeeId: user.employeeId })
        .sort({ [sort]: order })
        .limit(+limit)
        .skip((page - 1) * limit)
        .populate('employeeId reviewerId');
    } else {
      results = await this.model.find(query)
        .sort({ [sort]: order })
        .limit(+limit)
        .skip((page - 1) * limit)
        .populate('employeeId reviewerId', 'name name');
    }

      return {results, ...pagination}
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
