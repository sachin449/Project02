// Path: backend/routes/answerRoutes.js

const express = require('express');
const router = express.Router();
const upload = require('../multerConfig'); // Import multer configuration for file uploads
const answerController = require('../controllers/answerController');

// Route to handle form submission with file uploads
router.post('/submit', upload.array('files', 10), answerController.submitAnswer);

module.exports = router;


// // backend/routes/answerRoutes.js
// const express = require('express');
// const { submitAnswer, getAnswers } = require('../controllers/answerController');

// const router = express.Router();

// router.post('/', submitAnswer);
// router.get('/', getAnswers);

// module.exports = router;