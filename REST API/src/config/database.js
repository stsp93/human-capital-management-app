const mongoose = require('mongoose');
const { CONNECTION_STRING } = require('./constants');
mongoose.set('strictQuery', true);

module.exports = () => mongoose.connect(CONNECTION_STRING);
