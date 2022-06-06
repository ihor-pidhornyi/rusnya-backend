const mongoose = require('mongoose');

const currencySchema = new mongoose.Schema({
  code: { type: String },
  name: { type: String },
  iconName: { type: String },
  min: { type: Number },
  max: { type: Number },
  availableCurrencies: [
    {
      code: { type: String },
      name: { type: String },
      iconName: { type: String },
      rate: { type: Number },
      reserve: { type: Number },
    },
  ],
  message: { type: String },
});

module.exports = mongoose.model('currency', currencySchema);
