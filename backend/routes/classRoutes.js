const express = require('express');
const router = express.Router();
const { createClass, getClasses } = require('../controllers/classController');
const { auth, permit } = require('../middleware/authMiddleware');

router.post('/', auth, permit('admin','faculty'), createClass);
router.get('/', auth, permit('admin','faculty'), getClasses);

module.exports = router;
