const mongoose = require('mongoose');

const SubjectSchema = new mongoose.Schema({
  subjectId: { type: Number, required: true, unique: true },
  subjectName: { type: String, required: true },
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  year: { type: mongoose.Schema.Types.ObjectId, ref: 'Year', required: true }
});

module.exports = mongoose.model('Subject', SubjectSchema);
