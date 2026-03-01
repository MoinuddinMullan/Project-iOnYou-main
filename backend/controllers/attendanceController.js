const { verifyAttendance } = require('../utils/verificationSimulator');
const Attendance = require('../models/Attendance');
const Student = require('../models/Student');
const ClassModel = require('../models/Class');

const markAttendance = async (req, res, next) => {
  try {
    const { classId, faceId, nfcCardId } = req.body;
    if (!classId || !nfcCardId) return res.status(400).json({ message: 'classId and nfcCardId required' });
    const classObj = await ClassModel.findById(classId);
    if (!classObj) return res.status(404).json({ message: 'Class not found' });

    const verification = await verifyAttendance(faceId, nfcCardId);

    // If matched to a student and match true, mark present, else absent
    if (verification.type === 'student') {
      const student = await Student.findById(verification.id);
      const status = verification.match ? 'Present' : 'Absent';
      // Upsert attendance (unique index on student+class)
      const attendance = await Attendance.findOneAndUpdate(
        { student: student._id, class: classObj._id },
        { status, verificationMethod: 'Face+NFC', timestamp: new Date() },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );
      return res.json({ attendance, matched: verification.match });
    }

    // Not a student (could be faculty or unknown) - mark absent for safety
    const status = verification.match ? 'Present' : 'Absent';
    return res.status(200).json({ message: 'Verification result', matched: verification.match, status });
  } catch (err) {
    next(err);
  }
};

const getAttendanceByClass = async (req, res, next) => {
  try {
    const { classId } = req.params;
    const records = await Attendance.find({ class: classId }).populate('student');
    res.json(records);
  } catch (err) {
    next(err);
  }
};

const getAttendanceByStudent = async (req, res, next) => {
  try {
    const { studentId } = req.params;
    const records = await Attendance.find({ student: studentId }).populate('class');
    res.json(records);
  } catch (err) {
    next(err);
  }
};

module.exports = { markAttendance, getAttendanceByClass, getAttendanceByStudent };
