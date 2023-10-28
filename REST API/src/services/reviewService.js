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
    let { page = QUERY_DEFAULTS.page, 
      limit = QUERY_DEFAULTS.limit, 
      sort =  QUERY_DEFAULTS.sort, 
      order =  QUERY_DEFAULTS.order, 
      ...filters } = query;
    const pagination = await this.createPagination(page,limit,sort);
    let results
    if (user.role === 'user') {
      results = await this.model.find({ employeeId: user.employeeId })
        .sort({ [sort]: order })
        .limit(+limit)
        .skip((page - 1) * limit)
        .populate('employeeId reviewerId');
    } else {
      results = await this.model.find(filters)
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
