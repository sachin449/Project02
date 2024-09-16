const express = require('express');
const router = express.Router();
const questionController = require('../controllers/questionController');

// Route to get all distinct categories
router.get('/categories', questionController.getCategories);

// Route to get subcategories based on the selected category
router.get('/subcategories/:category', questionController.getSubcategoriesByCategory);

// Route to get questions based on subcategory
router.get('/subcategory/:subcategory', questionController.getQuestionsBySubcategory);

module.exports = router;

// // Path: backend/routes/questionRoutes.js

// const express = require('express');
// const router = express.Router();
// const questionController = require('../controllers/questionController');

// // Route to get all questions
// router.get('/', questionController.getQuestions);

// module.exports = router;



// // backend/routes/questionRoutes.js
// const express = require('express');
// const { createQuestion, getQuestions } = require('../controllers/questionController');

// const router = express.Router();

// router.post('/', createQuestion);
// router.get('/', getQuestions);

// module.exports = router;