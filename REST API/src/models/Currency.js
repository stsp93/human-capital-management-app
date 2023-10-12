const { Schema, model} = require("mongoose");

const currencySchema = new Schema({
  name: {
    type: String,
    required: [true, 'Please enter the currency name'],
  },
});

module.exports = model('Currency', currencySchema);