// Path: backend/controllers/questionController.js

const Question = require('../models/Question');

exports.getQuestions = async (req, res) => {
    try {
        const questions = await Question.find();
        res.status(200).json(questions);
    } catch (error) {
        console.error('Error fetching questions:', error);
        res.status(500).json({ error: 'Failed to fetch questions' });
    }
};

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