const { Schema, model, Types } = require("mongoose");
const emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const employeeSchema = new Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    match: [emailPattern, 'Please add a valid email address.'],
  },
  phone: {
    type: String,
  },
  address: {
    type: String,
  },
  
});

const Employee = model('Employee', employeeSchema);

module.exports = Employee