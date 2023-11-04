const Employee = require("../models/Employee");
const Leave = require("../models/Leave");
const PerformanceReview = require("../models/PerformanceReview");
const Position = require("../models/Position");
const Service = require("./Service");

class EmployeeService extends Service {
  constructor() {
    super(Employee);
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