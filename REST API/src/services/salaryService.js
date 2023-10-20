const Position = require("../models/Position");
const Salary = require("../models/Salary");
const CustomError = require("../utilities/CustomError");
const isAuthorizedUser = require("../utilities/isAuthorizedUser");
const Service = require("./Service");

class SalaryService extends Service {
    constructor() {
      super(Salary);
    }

    async getById(id, user) {
      // Get Salary
      const salary = await this.model.findById(id);
      if(salary === null) throw new CustomError('Salary record not found', 404);
      // Get Position
      const position = await Position.findById(salary.positionId);
      if(position === null) throw new CustomError('Salary related position not found', 404);
      // Check if auth to read salary
      if(!isAuthorizedUser(user.role, user.employeeId, position.employeeId)) {
        throw new CustomError('Unauthorized: User may only read its own salary');
      }

      return salary;
    }
}
module.exports = new SalaryService()