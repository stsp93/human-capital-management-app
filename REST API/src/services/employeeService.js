const Employee = require("../models/Employee");

async function getAll() {
    return await Employee.find();
}

async function getById(id) {
    return await Employee.findById(id);
}

async function update(id, input) {
    const employee = await Employee.findById(id);

    Object.entries(input).forEach(([k, v]) => employee[k] = v);


    return await employee.save();
}

async function deleteById(id) {
    const employee = await Employee.findById(id);

    return await employee.deleteOne();
}

module.exports = {
    getAll,
    getById,
    update,
    deleteById
}

