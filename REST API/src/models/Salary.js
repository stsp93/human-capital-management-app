const { Schema, model, Types } = require("mongoose");

const salarySchema = new Schema({
  amount: {
    type: Number,
    required:[true, 'Please specify the amount'],
    default: 0,
  },
  bonuses: [
    {
      _id: {
        type:Types.ObjectId,
        default: new Types.ObjectId(),
      },
      bonusType: {
        type: String,
      },
      amount: {
        type: Number,
      },
    },
  ],
  currency: {
    type: String,
    enum: {values:['USD','EUR', 'BGN'], message: 'Currency should be USD, EUR or BGN'},
    default: 'USD'
  },
});

const Salary = model('Salary', salarySchema);

module.exports = Salary