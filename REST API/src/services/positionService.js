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
    const queryObj = this.formatQuery(query)
  
    const results = await this.querySearch(queryObj);
    if (user.role === 'user'){ 
      results.results.forEach(r => {
        r.salaryId = null;
      })
  }

    return results;
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