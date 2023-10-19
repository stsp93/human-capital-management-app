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
  employee_id: {
    type: Types.ObjectId,
    ref: 'Employee',
  },
  salary: {
    type: Types.ObjectId,
    ref:'Salary',
  },
  start_date: {
    type: Date,
    required: [true, 'Please specify the start_date'],
  },
  end_date: {
    type: Date,//TODO:end date logic on active change
  },
  active: {
    type: Boolean,
    default: true
  }
});

const Position = model('Position', positionSchema);

module.exports = Position