const ClassModel = require('../models/Class');
const Course = require('../models/Course');
const Year = require('../models/Year');
const Division = require('../models/Division');
const Subject = require('../models/Subject');
const Faculty = require('../models/Faculty');

const createClass = async (req, res, next) => {
  try {
    const { subjectId, facultyId, courseId, yearId, divisionId, timestamp } = req.body;
    if (!subjectId || !facultyId || !courseId || !yearId || !divisionId) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const subject = await Subject.findOne({ subjectId });
    const faculty = await Faculty.findOne({ facultyId });
    const course = await Course.findOne({ courseId });
    const year = await Year.findOne({ yearId });
    const division = await Division.findOne({ divisionId, course: course._id, year: year._id });
    if (!subject || !faculty || !course || !year || !division) return res.status(400).json({ message: 'Invalid references' });

    const newClass = await ClassModel.create({
      subject: subject._id,
      faculty: faculty._id,
      course: course._id,
      year: year._id,
      division: division._id,
      timestamp: timestamp ? new Date(timestamp) : undefined
    });
    res.status(201).json(newClass);
  } catch (err) {
    next(err);
  }
};

const getClasses = async (req, res, next) => {
  try {
    const classes = await ClassModel.find().populate('subject faculty course year division');
    res.json(classes);
  } catch (err) {
    next(err);
  }
};

module.exports = { createClass, getClasses };
