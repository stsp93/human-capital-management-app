const Leave = require("../models/Leave");

async function getAll() {
    return await Leave.find();
}

async function getById(id) {
    return await Leave.findById(id);
}

async function create(input) {
    return await Leave.create(input);
}

async function update(id, input) {
    const leave = await Leave.findById(id);
    Object.entries(input).forEach(([k, v]) => leave[k] = v);

    return await leave.save();
}

async function deleteById(id) {
    const leave = await Leave.findById(id);

    return await leave.deleteOne();
}

module.exports = {
    getAll,
    getById,
    create,
    update,
    deleteById
}
