const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
  courseId: { type: Number, unique: true, required: true },
  courseName: { type: String, required: true }
});

module.exports = mongoose.model('Course', CourseSchema);
