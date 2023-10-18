const { Schema, model, Types } = require("mongoose");

const salarySchema = new Schema({
  salary: {
    type: Number,
    required:[true, 'Please specify the salary'],
    default: 0,
  },
  bonuses: [
    {
      type: {
        type: String,
        required: [true, 'Please specify the bonus type'],
      },
      amount: {
        type: Number,
        required: [true, 'Please specify the bonus amount'],
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