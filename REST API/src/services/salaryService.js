const Salary = require("../models/Salary");
const Service = require("./Service");

class SalaryService extends Service {
    constructor() {
      super(Salary);
    }
}
module.exports = new SalaryService()