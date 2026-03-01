const Faculty = require('../models/Faculty');
const Subject = require('../models/Subject');

const createFaculty = async (req, res, next) => {
  try {
    const { facultyId, name, department, subjectIds, faceId, nfcCardId } = req.body;
    if (!facultyId || !name) return res.status(400).json({ message: 'Missing required fields' });
    const subjects = Array.isArray(subjectIds) ? subjectIds : [];
    const faculty = await Faculty.create({
      facultyId,
      name,
      department,
      subjects,
      faceId,
      nfcCardId
    });
    res.status(201).json(faculty);
  } catch (err) {
    next(err);
  }
};

const getFaculty = async (req, res, next) => {
  try {
    const list = await Faculty.find().populate('subjects');
    res.json(list);
  } catch (err) {
    next(err);
  }
};

module.exports = { createFaculty, getFaculty };
