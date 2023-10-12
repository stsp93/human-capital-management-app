const { Schema, model, Types } = require("mongoose");

const employeeSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Please enter the employee\'s name'],
  },
  position: {
    type: Types.ObjectId,
    ref: 'Position',
    required: [true, 'Please specify the employee\'s position'],
  },
  email: {
    type: String,
    required: [true, 'Please enter the employee\'s email'],
  },
  phone: {
    type: String,
    required: [true, 'Please enter the employee\'s phone number'],
  },
  country: {
    type: Types.ObjectId,
    ref: 'Country',
    required: [true, 'Please enter the employee\'s country'],
  },
  address: {
    type: String,
    required: [true, 'Please enter the employee\'s address'],
  },
  start_date: {
    type: Date,
    required: [true, 'Please specify the employee\'s start date'],
  },
});

module.exports = model('Employee', employeeSchema);