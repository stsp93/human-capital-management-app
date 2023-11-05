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
    query.active = query.active ? query.active : true;
    const queryObj = this.formatQuery(query);

    if (queryObj.search && user.role !== 'user') return await this.employeeRefNameSearch(queryObj)

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

    if(leave.status === 'approved') {
      const currentYear = (new Date).getFullYear()

      // Leave to stay active until the end of the year
      leave.muteAt = new Date(currentYear + 1,0) > leave.endDate ? new Date(currentYear + 1,0) : new Date(currentYear + 2,0); 
    }

    return await leave.save()
  }

  async create(input, user) {
    if (user.role === 'user') {
      input.employeeId = user.employeeId;
    }
    input.status = 'pending';
    input.muteAt = input.startDate;
    return await this.model.create(input);
  }

  async update(input, id, user) {
    this.checkId(id);
    const leave = await this.model.findById(id);

    if (!entity) {
      throw new CustomError('Entity not found', 404);
    }
    if (!isAuthorizedUser(user.role, user.employeeId, employeeId)) {
      throw new CustomError('Unauthorized: Users can only update their own records', 401);
    }
    input.muteAt = input.startDate;
    Object.assign(entity, input);

    return await entity.save();
  }
}
module.exports = new LeaveService()