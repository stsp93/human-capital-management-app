const { Schema, model } = require("mongoose");

const departmentSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Please enter the department name'],
        unique: true,
    },
});

const Department = model('Department', departmentSchema);

module.exports = Department;