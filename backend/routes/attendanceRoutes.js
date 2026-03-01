const express = require('express');
const router = express.Router();
const { markAttendance, getAttendanceByClass, getAttendanceByStudent } = require('../controllers/attendanceController');
const { auth, permit } = require('../middleware/authMiddleware');

router.post('/mark', auth, permit('admin','faculty'), markAttendance);
router.get('/class/:classId', auth, permit('admin','faculty'), getAttendanceByClass);
router.get('/student/:studentId', auth, permit('admin','faculty'), getAttendanceByStudent);

module.exports = router;
