const express = require('express');
const router = express.Router();
const upload = require('../multerConfig');
const answerController = require('../controllers/answerController');

// Submit Answers Route (POST)
router.post('/submit-answers', upload.array('files', 10), answerController.submitAnswer);

// Fetch Answers Route (GET)
router.get('/fetch-answers', answerController.fetchAnswers);

// Fetch Progress for Categories Route (GET)
router.get('/progress', answerController.getCategoryProgress); // NEW route for progress

module.exports = router;
