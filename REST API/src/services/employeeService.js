const Employee = require("../models/Employee");
const Service = require("./Service");

class EmployeeService extends Service {
  constructor() {
    super(Employee);
  }

  async update(id, input, user) {
    const entity = await this.model.findById(id);

    if (!entity) {
      throw {
        message: 'Employee not found',
        status: 404,
      }
    }

    // User can change only his own data
    if (user.role === "user" && user.employee_id !== id) {
      throw {
        message: 'Unauthorized: Users can only update their own records',
        status: 401
      }
    }

    // Update other fields
    Object.assign(entity, input);

    return await entity.save();
  }
}
module.exports = new EmployeeService()