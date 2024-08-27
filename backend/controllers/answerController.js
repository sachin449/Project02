// backend/controllers/answerController.js
const Answer = require('../models/Answer');
const mongoose = require('mongoose');

exports.submitAnswer = async (req, res) => {
    try {
        const answers = req.body.answers;

        for (let questionId in answers) {
            console.log('Processing answer:', questionId, answers[questionId]);

            if (!mongoose.Types.ObjectId.isValid(questionId)) {
                console.error('Invalid question ID:', questionId);
                return res.status(400).json({ error: `Invalid question ID: ${questionId}` });
            }

            if (!answers[questionId]) {
                console.error('Missing answer for question ID:', questionId);
                return res.status(400).json({ error: `Missing answer for question ID: ${questionId}` });
            }

            const newAnswer = new Answer({
                question: questionId,
                answer: answers[questionId]
            });

            await newAnswer.save();
        }

        res.status(201).json({ message: 'Answer(s) submitted successfully' });
    } catch (error) {
        console.error('Error saving answer:', error);
        res.status(500).json({ error: 'Failed to submit answer' });
    }
};

exports.getAnswers = async (req, res) => {
    try {
        const answers = await Answer.find().populate('question');
        res.status(200).json(answers);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch answers' });
    }
};