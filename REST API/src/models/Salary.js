const { Schema, model, Types } = require("mongoose");

const salarySchema = new Schema({
  employee: {
    type: Types.ObjectId,
    ref: 'Employee',
    required: [true, 'Please specify the employee'],
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
    type: Types.ObjectId,
    ref:'Currency',
    required: [true, 'Please specify the currency'],
  },
  // amount: Number, // TODO: to be calculated
});

module.exports = model('Salary', salarySchema);