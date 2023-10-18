const Department = require("../models/Department");

async function getAll() {
    return await Department.find();
}

async function getById(id) {
    return await Department.findById(id);
}

async function create(input) {
    return await Department.create(input);
}

async function update(id, input) {
    const department = await Department.findById(id);
    department.name = input.name;

    return await department.save();
}

async function deleteById(id) {
    const department = await Department.findById(id);

    return await department.deleteOne();
}

module.exports = {
    getAll,
    getById,
    create,
    update,
    deleteById
}

