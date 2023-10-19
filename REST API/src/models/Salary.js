const { Schema, model, Types } = require("mongoose");

const salarySchema = new Schema({
  position_id: {
    type: Types.ObjectId,
    ref: 'Position',
  },
  salary: {
    type: Number,
    required:[true, 'Please specify the salary'],
    default: 0,
  },
  bonuses: [
    {
      type: {
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