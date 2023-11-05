// const {daysInMiliseconds} = 



const { Schema, model, Types } = require("mongoose");
const { daysInMiliseconds } = require("../utilities/utilities");

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

  },
  endDate: {
    type: Date,
    required: [true, 'Please specify the end date'],
    validate: [
      {
        validator: function (value) {
          return value > this.startDate;
        },
        message: 'End Date should be after than startDate',
      },
      {
        validator: function (value) {
          const maxDuration = daysInMiliseconds(30);
          const duration = value - this.startDate;
          return duration <= maxDuration;
        },
        message: 'Leave duration cannot exceed 30 days',
      },
    ],
  },
  status: {
    type: String,
    enum: { values: ['pending', 'approved', 'rejected'], message: "Status should be pending, approved or rejected" },
    default: 'pending',
  },
  muteAt: { type: Date },
  active: { type: Boolean, default: true },
});

leaveSchema.pre('save', async function (next) {
  if (this.isModified('startDate') && this.startDate < new Date()) {
    throw new Error(`Invalid Start Date`);
  }
  next()
})

// Check in 7 days to mute inactive leaves (Cron job)
setInterval(async () => {
  const currentTime = new Date();
  const leaves = await Leave.find({ muteAt: { $lt: currentTime }, active: true });
  leaves.forEach((leave) => {
    const currentTime = new Date();
    if (leave.muteAt < currentTime) {
      leave.active = false;
      leave.save();
    }
  });
}, daysInMiliseconds(7));

const Leave = model('Leave', leaveSchema);

module.exports = Leave;