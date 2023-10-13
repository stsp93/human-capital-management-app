const { Schema, model, Types } = require("mongoose");

const leaveSchema = new Schema({
  employee: {
    type: Types.ObjectId,
    ref: 'Employee',
    required: [true, 'Please specify the employee'],
  },
  type: {
    type: String,
    required: [true, 'Please specify the leave type'],
  },
  start_date: {
    type: Date,
    required: [true, 'Please specify the start date'],
  },
  end_date: {
    type: Date,
    required: [true, 'Please specify the end date'],
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
  },
});

module.exports = model('Leave', leaveSchema);