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
        return await this.model.find({ query }).select('-salary').populate('employeeId department');
      }
      return await this.model.find(query ).populate('employeeId department salaryId');
    }

    // Override limiting user role
    async getById(id,user) {
      const position = await this.model.findById(id);
      if(position == null) throw new CustomError('Position not found', 404);
      
      // Check and return partial data
      console.log(user.employeeId);
      console.log(position.employeeId);
      if(!isAuthorizedUser(user.role, user.employeeId, position.employeeId)) {
        return await this.model.findById(id).select('name department employeeId startDate active');
      }
      return position.populate('employeeId department salaryId');
    }

    async create(position) {
      // Change recent active position to inactive and set end date
      const recentPosition = await this.model.findOne({employeeId: position.employeeId, active: true}).exec();
      recentPosition.active = false;
      recentPosition.endDate = position.startDate;
      recentPosition.save();

      // Create new position
      return await this.model.create(position);
    }
}
module.exports = new PositionService()