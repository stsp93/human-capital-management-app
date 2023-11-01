const Position = require("../models/Position");
const Salary = require("../models/Salary");
const CustomError = require("../utilities/CustomError");
const isAuthorizedUser = require("../utilities/isAuthorizedUser");
const Service = require("./Service");

class SalaryService extends Service {
  constructor() {
    super(Salary);
  }

  async getById(id, user) {
    // Get Salary
    const salary = await this.model.findById(id);
    if (salary === null) return {};
    // Get Position
    const position = await Position.findById(salary.positionId);

    if (!isAuthorizedUser(user.role, user.employeeId, position?.employeeId)) {
      throw new CustomError('Unauthorized: User may only read its own salary');
    }

    return salary;
  }

  async addBonus(salaryId, bonus) {
    let error = '';
    if (!bonus.bonusType) error += 'Specify bonus type. ';
    if (!bonus.amount) error += 'Specify bonus amount.';
    if(error) throw new CustomError(error);
    return await this.model.findByIdAndUpdate(salaryId, { $push: { bonuses:{bonusType:bonus.bonusType,amount: bonus.amount} } }, { new: true });
  }

  async removeBonus(salaryId, bonusId) {
   if (!bonusId) throw new CustomError('Specify bonus id');
    return await this.model.findByIdAndUpdate(salaryId, { $pull: { bonuses: { _id: bonusId } } });

  }
}
module.exports = new SalaryService()