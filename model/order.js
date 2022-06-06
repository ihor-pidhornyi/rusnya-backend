const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  from: {
    code: { type: String, required: true },
    name: { type: String, required: true },
    amount: { type: Number, required: true },
  },
  to: {
    code: { type: String, required: true },
    name: { type: String, required: true },
    amount: { type: Number, required: true },
  },
  email: { type: String, required: true },
  userName: { type: String, required: true },
  dateStart: { type: Date, required: true },
  dateEnd: { type: Date, required: true },
  requisites: { type: String, required: true },
  status: { type: String, require: true },
});

module.exports = mongoose.model('order', orderSchema);
