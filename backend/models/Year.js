const mongoose = require('mongoose');

const YearSchema = new mongoose.Schema({
  yearId: { type: Number, required: true, unique: true },
  yearName: { type: String, required: true }
});

module.exports = mongoose.model('Year', YearSchema);
