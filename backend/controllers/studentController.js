const Student = require('../models/Student');
const Course = require('../models/Course');
const Year = require('../models/Year');
const Division = require('../models/Division');

const createStudent = async (req, res, next) => {
  try {
    const { enrollmentNo, name, courseId, yearId, divisionId, faceId, nfcCardId } = req.body;
    if (!enrollmentNo || !name || !courseId || !yearId || !divisionId) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const course = await Course.findOne({ courseId });
    const year = await Year.findOne({ yearId });
    const division = await Division.findOne({ divisionId, course: course._id, year: year._id });
    if (!course || !year || !division) return res.status(400).json({ message: 'Invalid course/year/division' });

    const student = await Student.create({
      enrollmentNo,
      name,
      course: course._id,
      year: year._id,
      division: division._id,
      faceId,
      nfcCardId
    });
    res.status(201).json(student);
  } catch (err) {
    next(err);
  }
};

const getStudents = async (req, res, next) => {
  try {
    const students = await Student.find().populate('course year division');
    res.json(students);
  } catch (err) {
    next(err);
  }
};

const getStudentById = async (req, res, next) => {
  try {
    const student = await Student.findById(req.params.id).populate('course year division');
    if (!student) return res.status(404).json({ message: 'Student not found' });
    res.json(student);
  } catch (err) {
    next(err);
  }
};

module.exports = { createStudent, getStudents, getStudentById };
