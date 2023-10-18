const { Schema, model } = require("mongoose");

const countrySchema = new Schema({
  name: {
    type: String,
    required: [true, 'Please enter the country name'],
  },
});

const Country = model('Country', countrySchema);

module.exports = Country;