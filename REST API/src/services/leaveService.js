const { QUERY_DEFAULTS } = require("../config/constants");
const Leave = require("../models/Leave");
const CustomError = require("../utilities/CustomError");
const isAuthorizedUser = require("../utilities/isAuthorizedUser");
const Service = require("./Service");

class LeaveService extends Service {
  constructor() {
    super(Leave);
  }



  async getAll(query, user) {
      const queryObj = this.formatQuery(query);

      if(queryObj.search && user.role !== 'user') return await this.employeeRefNameSearch(queryObj)
    
    // User limited access(only own leaves)
    if (user.role === 'user') queryObj.filters.employeeId = user.employeeId
    
    return await this.querySearch(queryObj);
  }

  async getById(id, user) {
    const leave = await this.model.findById(id);
    const leaveEmployeeId = leave.employeeId;
    if (!isAuthorizedUser(user.role, user.employeeId, leaveEmployeeId)) {
      throw new CustomError('Unauthorized: User can only read his own leaves');
    }

    return leave;
  }

  async resolve(id, status) {
    const leave = await this.model.findById(id);
    if (leave.status !== 'pending') throw new Error(`This leave request is already ${leave.status}`);
    leave.status = status;

    return await leave.save()
  }

  async create(input, user) {
    if(user.role === 'user') {
      input.employeeId = user.employeeId;
    }
    input.status = 'pending';

    return await this.model.create(input);
  }
}
module.exports = new LeaveService()