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
    validate: {
      validator: function(value) {
        // Ensure start_date is before end_date
        return value > this.start_date;
      },
      message: 'end_date should be before than start_date',
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