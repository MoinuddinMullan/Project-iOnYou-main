const express = require('express');
const router = express.Router();
const { createSubject, getSubjects } = require('../controllers/subjectController');
const { auth, permit } = require('../middleware/authMiddleware');

router.post('/', auth, permit('admin'), createSubject);
router.get('/', auth, permit('admin','faculty'), getSubjects);

module.exports = router;
