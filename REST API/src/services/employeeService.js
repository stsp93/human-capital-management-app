const Employee = require("../models/Employee");
const CustomError = require("../utilities/CustomError");
const isAuthorizedUser = require("../utilities/isAuthorizedUser");
const Service = require("./Service");

class EmployeeService extends Service {
  constructor() {
    super(Employee);
  }

  async update(id, input, user) {
    const entity = await this.model.findById(id);

    if (!entity) { 
      throw new CustomError('Employee not found', 404) ;
    }


    // User can change only his own record
    if (isAuthorizedUser(user.role, user.employeeId,id)) {
      throw new CustomError('Unauthorized: Users can only update their own records', 401);
    }

    // Update fields
    Object.assign(entity, input);

    return await entity.save();
  }
}
module.exports = new EmployeeService()