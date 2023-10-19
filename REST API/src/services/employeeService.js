const Employee = require("../models/Employee");
const Service = require("./Service");

class EmployeeService extends Service {
    constructor() {
      super(Employee);
    }
}
module.exports = new EmployeeService()