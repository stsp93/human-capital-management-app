const Leave = require("../models/Leave");
const Service = require("./Service");

class LeaveService extends Service {
    constructor() {
      super(Leave);
    }
}
module.exports = new LeaveService()