const Student = require('../models/Student');
const Faculty = require('../models/Faculty');

async function verifyAttendance(faceId, nfcCardId) {
  // Try student first
  const student = await Student.findOne({ nfcCardId });
  if (student) {
    const match = !!(student.faceId && faceId && student.faceId === faceId);
    return { type: 'student', id: student._id, match };
  }

  // Try faculty
  const faculty = await Faculty.findOne({ nfcCardId });
  if (faculty) {
    const match = !!(faculty.faceId && faceId && faculty.faceId === faceId);
    return { type: 'faculty', id: faculty._id, match };
  }

  return { type: null, id: null, match: false };
}

module.exports = { verifyAttendance };
