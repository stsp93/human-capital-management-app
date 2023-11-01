const Employee = require("../models/Employee");
const CustomError = require("../utilities/CustomError");
const isAuthorizedUser = require("../utilities/isAuthorizedUser");
const Service = require("./Service");
const salaryService = require("./salaryService");

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
    console.log(input);
    // Update fields
    Object.assign(entity, input);

    return await entity.save();
  }

  async create(input) {
    const newSalary = await salaryService.create({})
    input.salaryId = newSalary._id;
    try {
      return await this.model.create(input);

    } catch (error) {
      await salaryService.deleteById(newSalary._id);
      throw error;
    }
  }
}
module.exports = new EmployeeService()