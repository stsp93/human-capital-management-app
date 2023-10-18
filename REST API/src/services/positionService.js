const Position = require("../models/Position");

async function getAll() {
    return await Position.find();
}

async function getById(id) {
    return await Position.findById(id);
}

async function create(input) {
    return await Position.create(input);
}

async function update(id, input) {
    const position = await Position.findById(id);
    Object.entries(input).forEach(([k, v]) => position[k] = v);

    return await position.save();
}

async function deleteById(id) {
    const position = await Position.findById(id);

    return await position.deleteOne();
}

module.exports = {
    getAll,
    getById,
    create,
    update,
    deleteById
}
