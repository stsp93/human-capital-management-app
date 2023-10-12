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
  base_salary: {
    type: Number,
    required: [true, 'Please specify the base salary'],
  },
});

module.exports = model('Position', positionSchema);