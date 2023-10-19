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
  startDate: {
    type: Date,
    required: [true, 'Please specify the start date'],
  },
  endDate: {
    type: Date,
    required: [true, 'Please specify the end date'],
    validate: {
      validator: function(value) {
        return value > this.startDate;
      },
      message: 'endDate should be before than startDate',
    },
  },
  status: {
    type: String,
    enum: {values:['pending', 'approved', 'rejected'], message:"Status should be pending, approved or rejected"},
    default: 'pending',
  },
});

const Leave = model('Leave', leaveSchema);

module.exports = Leave;