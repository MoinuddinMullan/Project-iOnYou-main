const mongoose = require('mongoose');

const FacultySchema = new mongoose.Schema({
  facultyId: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  department: { type: String },
  subjects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Subject' }],
  faceId: { type: String },
  nfcCardId: { type: String, unique: true, sparse: true }
});

module.exports = mongoose.model('Faculty', FacultySchema);
