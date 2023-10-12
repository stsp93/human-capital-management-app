const { Schema, model } = require("mongoose");

const departmentSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Please enter the department name'],
    },
});

module.exports = model('Department', departmentSchema);