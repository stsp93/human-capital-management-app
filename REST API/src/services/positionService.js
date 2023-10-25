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
      if(user.role === 'user') {
        return await this.model.find(query ).select('-salary').populate('department');
      }
      return await this.model.find(query).populate('employee department salary');
    }

    // get by employee id
    async getById(employee,user) {
      const position = await this.model.findOne({employee, active: true});
      if(position == null) return null;
      // Check and return partial data
      if(!isAuthorizedUser(user.role, user.employeeId, position.employee)) {
        return await this.model.findOne({employee, active: true}).select('-salary').populate('department');
      }
      return position.populate('employee department salary');
    }

    async create(position) {
      // Change recent active position to inactive and set end date
      const recentPosition = await this.model.findOne({employee: position.employee, active: true}).exec();
      recentPosition.active = false;
      recentPosition.endDate = position.startDate;
      recentPosition.save();

      // Create new position
      return await this.model.create(position);
    }
}
module.exports = new PositionService()