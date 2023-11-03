const Employee = require("../models/Employee");
const Leave = require("../models/Leave");
const PerformanceReview = require("../models/PerformanceReview");
const Position = require("../models/Position");
const CustomError = require("../utilities/CustomError");
const isAuthorizedUser = require("../utilities/isAuthorizedUser");
const Service = require("./Service");

class EmployeeService extends Service {
  constructor() {
    super(Employee);
  }

  async update(input, id, user) {
    const entity = await this.model.findById(id);

    if (!entity) {
      throw new CustomError('Employee not found', 404);
    }
    // User can change only his own record
    if (!isAuthorizedUser(user.role, user.employeeId, id)) {
      throw new CustomError('Unauthorized: Users can only update their own records', 401);
    }
    // Update fields
    Object.assign(entity, input);

    return await entity.save();
  }

  async deleteById(id) {
    const query = {employeeId: id}
    const positions = await Position.find(query);
    positions.forEach(async p => await Position.deleteOne(p)) // So it can cascade delete ref Salaries
    await PerformanceReview.deleteMany(query)
    await Leave.deleteMany(query);
    
    return await this.model.deleteOne({ _id: id });
  }
}
module.exports = new EmployeeService()