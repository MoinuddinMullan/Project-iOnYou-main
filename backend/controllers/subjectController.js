const Subject = require('../models/Subject');
const Course = require('../models/Course');
const Year = require('../models/Year');

const createSubject = async (req, res, next) => {
  try {
    const { subjectId, subjectName, courseId, yearId } = req.body;
    if (!subjectId || !subjectName || !courseId || !yearId) return res.status(400).json({ message: 'Missing required fields' });
    const course = await Course.findOne({ courseId });
    const year = await Year.findOne({ yearId });
    if (!course || !year) return res.status(400).json({ message: 'Invalid course/year' });
    const subject = await Subject.create({ subjectId, subjectName, course: course._id, year: year._id });
    res.status(201).json(subject);
  } catch (err) {
    next(err);
  }
};

const getSubjects = async (req, res, next) => {
  try {
    const list = await Subject.find().populate('course year');
    res.json(list);
  } catch (err) {
    next(err);
  }
};

module.exports = { createSubject, getSubjects };
