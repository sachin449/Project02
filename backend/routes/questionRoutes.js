
const express = require('express');
const router = express.Router();
const questionController = require('../controllers/questionController');


router.get('/categories', questionController.getCategories);


router.get('/subcategories/:category', questionController.getSubcategoriesByCategory);


router.get('/subcategory/:subcategory', questionController.getQuestionsBySubcategory);

module.exports = router;
