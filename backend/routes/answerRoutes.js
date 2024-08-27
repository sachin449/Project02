// backend/routes/answerRoutes.js
const express = require('express');
const { submitAnswer, getAnswers } = require('../controllers/answerController');

const router = express.Router();

router.post('/', submitAnswer);
router.get('/', getAnswers);

module.exports = router;