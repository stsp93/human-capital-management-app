const { Schema, model, Types } = require("mongoose");

const leaveSchema = new Schema({
  employeeId: {
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
    validate: {
      validator: function(value) {

        return value >= Date.now();
      },
      message: `Start Date can't be in the past`,
    }
  },
  endDate: {
    type: Date,
    required: [true, 'Please specify the end date'],
    validate: [
      {
        validator: function(value) {
          return value > this.startDate;
        },
        message: 'End Date should be after than startDate',
      },
      {
        validator: function(value) {
          const maxDuration = 30 * 24 * 60 * 60 * 1000; // 30 days in milliseconds
          const duration = value - this.startDate;
          return duration <= maxDuration;
        },
        message: 'Leave duration cannot exceed 30 days',
      },
    ],
  },
  status: {
    type: String,
    enum: {values:['pending', 'approved', 'rejected'], message:"Status should be pending, approved or rejected"},
    default: 'pending',
  },
  expireAt : { type: Date, default: Date.now, expires: '20d' }
});

const Leave = model('Leave', leaveSchema);

module.exports = Leave;