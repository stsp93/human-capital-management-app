const Position = require("../models/Position");
const CustomError = require("../utilities/CustomError");
const isAuthorizedUser = require("../utilities/isAuthorizedUser");
const Service = require("./Service");

class PositionService extends Service {
  constructor() {
    super(Position);
  }

  // Override limiting user role
  async getAll(user, query) {
    // pagination
    const { page = 1, limit = 1, ...filters } = query;
    const totalPages =await  this.model.countDocuments(filters);
    const nextPage = +page < totalPages ? +page + 1 : null;
    const prevPage = +page > 1 ? +page - 1 : null;
    let results;

    if (user.role === 'user') {
      results =  await this.model.find(filters)
        .limit(+limit)
        .skip((page - 1) * limit)
        .select('-salary')
        .populate('employee department');
    }

    results = await this.model.find(filters)
      .limit(+limit)
      .skip((page - 1) * limit)
      .populate('employee department salary');

      return { results, totalPages, currentPage: page, nextPage, prevPage }
  }

  // get by employee id
  async getById(employee, user) {
    console.log(await this.model.find({ employee, active: true }));
    const position = await this.model.findOne({ employee, active: true });
    console.log(employee);
    if (position == null) return null;
    // Check and return partial data
    if (!isAuthorizedUser(user.role, user.employeeId, position.employee)) {
      return await this.model.findOne({ employee, active: true }).select('-salary').populate('employee department');
    }
    return position.populate('employee department salary');
  }

  async create(position) {
    // Change recent active position to inactive and set end date
    const recentPosition = await this.model.findOne({ employee: position.employee, active: true }).exec();
    recentPosition.active = false;
    recentPosition.endDate = position.startDate;
    recentPosition.save();

    // Create new position
    return await this.model.create(position);
  }
}
module.exports = new PositionService()