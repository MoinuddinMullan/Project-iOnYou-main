const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
  enrollmentNo: { type: String, required: true, unique: true, index: true },
  name: { type: String, required: true },
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  year: { type: mongoose.Schema.Types.ObjectId, ref: 'Year', required: true },
  division: { type: mongoose.Schema.Types.ObjectId, ref: 'Division', required: true },
  faceId: { type: String },
  nfcCardId: { type: String, unique: true, sparse: true }
});

module.exports = mongoose.model('Student', StudentSchema);
