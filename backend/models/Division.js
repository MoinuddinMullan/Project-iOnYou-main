const mongoose = require('mongoose');

const DivisionSchema = new mongoose.Schema({
  divisionId: { type: Number, required: true },
  divisionName: { type: String, required: true },
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  year: { type: mongoose.Schema.Types.ObjectId, ref: 'Year', required: true }
});

DivisionSchema.index({ divisionId: 1, course: 1, year: 1 }, { unique: true });

module.exports = mongoose.model('Division', DivisionSchema);
