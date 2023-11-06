const Position = require("../models/Position");
const isAuthorizedUser = require("../utilities/isAuthorizedUser");
const { QUERY_DEFAULTS } = require('../config/constants')
const Service = require("./Service");
const salaryService = require("./salaryService");
const CustomError = require("../utilities/CustomError");

class PositionService extends Service {
  constructor() {
    super(Position);
  }

  // Override limiting user role
  async getAll(query, user) {
    // pagination
    const { page = QUERY_DEFAULTS.page,
      limit = QUERY_DEFAULTS.limit,
      ...filters } = query;
    const pagination = await this.createPagination(page, limit, filters);
    
    let results;
    if (user.role === 'user') {
      results = await this.model.find(filters)
        .limit(+limit)
        .skip((page - 1) * limit)
        .select('-salaryId')
    } else {
      results = await this.model.find(filters)
        .limit(+limit)
        .skip((page - 1) * limit)
    }

    return { results, ...pagination }
  }

  // get by employee id
  async getById(employeeId, user) {
    const position = await this.model.findOne({ employeeId, active: true });
    if (position == null) return {};
    // Check and return partial data
    if (!isAuthorizedUser(user.role, user.employeeId, position.employeeId)) {
      return await this.model.findOne({ employeeId, active: true }).select('-salaryId');
    }
    return position;
  }

  async create(position) {
    // Change recent active position to inactive and set end date
    const recentPosition = await this.model.findOne({ employeeId: position.employeeId, active: true }).exec();
    if(recentPosition) {
      recentPosition.active = false;
      recentPosition.endDate = position.startDate;
    }
    
    let newPosition;
    const newSalary = await salaryService.create({});
    position.salaryId = newSalary._id;
    try {
      // Create new position
      newPosition = await this.model.create(position);
      recentPosition?.save();

    }catch(error) {
      await salaryService.deleteById(newSalary._id);
      throw error;
    }

    return newPosition;
  }

  async update( input, id) {
    this.checkId(id);
    const position = await this.model.findOne({employeeId: id, active: true});
    if (position === null) throw new CustomError('Position not found', 404)

    Object.assign(position, input);
    await position.save();
    return position;
  }
}
module.exports = new PositionService()