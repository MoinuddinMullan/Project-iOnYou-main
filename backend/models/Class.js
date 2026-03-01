const mongoose = require('mongoose');

const ClassSchema = new mongoose.Schema({
  subject: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject', required: true },
  faculty: { type: mongoose.Schema.Types.ObjectId, ref: 'Faculty', required: true },
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  year: { type: mongoose.Schema.Types.ObjectId, ref: 'Year', required: true },
  division: { type: mongoose.Schema.Types.ObjectId, ref: 'Division', required: true },
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Class', ClassSchema);
