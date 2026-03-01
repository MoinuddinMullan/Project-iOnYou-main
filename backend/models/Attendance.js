const mongoose = require('mongoose');

const AttendanceSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  class: { type: mongoose.Schema.Types.ObjectId, ref: 'Class', required: true },
  status: { type: String, enum: ['Present', 'Absent'], required: true },
  verificationMethod: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

AttendanceSchema.index({ student: 1, class: 1 }, { unique: true });

module.exports = mongoose.model('Attendance', AttendanceSchema);
