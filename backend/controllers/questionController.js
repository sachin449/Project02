const Question = require('../models/Question');

// Controller to fetch all distinct categories
exports.getCategories = async (req, res) => {
    try {
        const categories = await Question.distinct('category');
        res.status(200).json(categories);
    } catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).json({ error: 'Failed to fetch categories' });
    }
};

// Controller to fetch distinct subcategories for a selected category
exports.getSubcategoriesByCategory = async (req, res) => {
    const { category } = req.params;
    try {
        const subcategories = await Question.distinct('subcategory', { category });
        res.status(200).json(subcategories);
    } catch (error) {
        console.error('Error fetching subcategories:', error);
        res.status(500).json({ error: 'Failed to fetch subcategories' });
    }
};

// Controller to fetch questions by subcategory
exports.getQuestionsBySubcategory = async (req, res) => {
    const { subcategory } = req.params;
    try {
        const questions = await Question.find({ subcategory }, 'questionText');
        res.status(200).json(questions);
    } catch (error) {
        console.error('Error fetching questions:', error);
        res.status(500).json({ error: 'Failed to fetch questions' });
    }
};

// // Path: backend/controllers/questionController.js

// const Question = require('../models/Question');

// exports.getQuestions = async (req, res) => {
//     try {
        
//         const questions = await Question.find();
//         // console.log(questions);
//         res.status(200).json(questions);
//     } catch (error) {
//         console.error('Error fetching questions:', error);
//         res.status(500).json({ error: 'Failed to fetch questions' });
//     }
// };

// You can add other controllers for creating questions, updating, etc.



// // backend/controllers/questionController.js
// const Question = require('../models/Question');

// exports.createQuestion = async (req, res) => {
//     try {
//         const newQuestion = new Question(req.body);
//         await newQuestion.save();
//         res.status(201).json(newQuestion);
//     } catch (error) {
//         res.status(500).json({ error: 'Failed to create question' });
//     }
// };

// exports.getQuestions = async (req, res) => {
//     try {
//         const questions = await Question.find();
//         res.status(200).json(questions);
//     } catch (error) {
//         res.status(500).json({ error: 'Failed to fetch questions' });
//     }
// };