const Salary = require("../models/Salary");

async function getAll() {
    return await Salary.find();
}

async function getById(id) {
    return await Salary.findById(id);
}

async function create(input) {
    return await Salary.create(input);
}

async function update(id, input) {
    const salary = await Salary.findById(id);
    Object.entries(input).forEach(([k, v]) => salary[k] = v);

    return await salary.save();
}

async function deleteById(id) {
    const salary = await Salary.findById(id);

    return await salary.deleteOne();
}

module.exports = {
    getAll,
    getById,
    create,
    update,
    deleteById
}
