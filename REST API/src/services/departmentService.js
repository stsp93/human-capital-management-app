const Department = require("../models/Department");
const Service = require("./Service");

class EmployeeService extends Service {
    constructor() {
      super(Department);
    }
}
module.exports = new EmployeeService()

