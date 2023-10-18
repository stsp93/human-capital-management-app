const { Schema, model, Types } = require("mongoose");

const salarySchema = new Schema({
  employee: {
    type: Types.ObjectId,
    ref: 'Employee',
    required: [true, 'Please specify the employee'],
  },
  salary: {
    type: Number,
    required:[true, 'Please specify the salary'],
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
    enum: ['USD','EUR', 'BGN'],
  },
  // amount: Number, // TODO: to be calculated
});

const Salary = model('Salary', salarySchema);

module.exports = Salary