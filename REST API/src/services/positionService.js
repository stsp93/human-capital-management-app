const Position = require("../models/Position");
const isAuthorizedUser = require("../utilities/isAuthorizedUser");
const Service = require("./Service");

class PositionService extends Service {
    constructor() {
      super(Position);
    }

    // Override limiting user role
    async getAll(user) {
      if(user.role === 'user') {
        return await this.model.select('name department employeeId startDate active');
      }
      return this.model.find()
    }

    // Override limiting user role
    async getById(id,user) {
      if(!isAuthorizedUser(user.role, user.employeeId, id)) {
        return await this.model.findById(id).select('name department employeeId startDate active')
      }
      
      return await this.model.findById(id);
    }
}
module.exports = new PositionService()