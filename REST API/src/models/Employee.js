const { Schema, model, Types } = require("mongoose");
const emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

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
    match: [emailPattern, 'Please add a valid email address.'],
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