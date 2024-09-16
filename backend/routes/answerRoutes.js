// Path: backend/routes/answerRoutes.js

const express = require('express');
const router = express.Router();
const upload = require('../multerConfig'); 
const answerController = require('../controllers/answerController');


router.post('/submit', upload.array('files', 10), answerController.submitAnswer);

module.exports = router;

