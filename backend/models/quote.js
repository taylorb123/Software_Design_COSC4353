const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const quoteSchema = new Schema({
  gallons: { type: String, required: true },
  address1: { type: String, required: true },
  address2: { type: String, required: false },
  date: { type: String, required: true },
  ppg: { type: Number, required: true },
  total: { type: Number, required: true },
  username: { type: String, required: true },
});

module.exports = mongoose.model('Quote', quoteSchema);
