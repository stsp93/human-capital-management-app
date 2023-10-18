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
  },
  start_date: {
    type: Date,
    required: [true, 'Please specify the start_date'],
  },
});

const Position = model('Position', positionSchema);

module.exports = Position