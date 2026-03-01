const express = require('express');
const router = express.Router();
const { createFaculty, getFaculty } = require('../controllers/facultyController');
const { auth, permit } = require('../middleware/authMiddleware');

router.post('/', auth, permit('admin'), createFaculty);
router.get('/', auth, permit('admin','faculty'), getFaculty);

module.exports = router;
