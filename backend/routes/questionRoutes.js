// Path: backend/routes/questionRoutes.js

const express = require('express');
const router = express.Router();
const questionController = require('../controllers/questionController');

// Route to get all questions
router.get('/', questionController.getQuestions);

module.exports = router;



// // backend/routes/questionRoutes.js
// const express = require('express');
// const { createQuestion, getQuestions } = require('../controllers/questionController');

// const router = express.Router();

// router.post('/', createQuestion);
// router.get('/', getQuestions);

// module.exports = router;