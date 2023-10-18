const { Schema, model, Types } = require("mongoose");

const positionSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Please enter the position name'],
  },
  department: {
    type: Types.ObjectId,
    ref: 'Department',
    required: [true, 'Please specify the department'],
  },
  salary: {
    type: Types.ObjectId,
    ref:'Salary',
    required: [true, 'Please specify the salary'],
  },
  start_date: {
    type: Date,
    required: [true, 'Please specify the start date'],
  },
});

const Position = model('Position', positionSchema);

module.exports = Position