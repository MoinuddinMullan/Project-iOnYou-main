const express = require('express');
const router = express.Router();
const { createStudent, getStudents, getStudentById } = require('../controllers/studentController');
const { auth, permit } = require('../middleware/authMiddleware');

router.post('/', auth, permit('admin', 'faculty'), createStudent);
router.get('/', auth, permit('admin', 'faculty'), getStudents);
router.get('/:id', auth, permit('admin', 'faculty'), getStudentById);

module.exports = router;
