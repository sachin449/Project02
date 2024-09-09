// Path: backend/controllers/answerController.js

const Answer = require('../models/Answer');

exports.submitAnswer = async (req, res) => {
    try {
        const answers = JSON.parse(req.body.answers); // Form answers (with questionId)
        const files = req.files; // Uploaded files

        console.log('Received Answers:', answers); // Log received data for debugging
        console.log('Received Files:', files);

        // Process answers and save file paths along with answers in MongoDB
        const savedAnswers = answers.map((answer) => {
            return {
                question: answer.question,  // Store questionId
                answer: answer.answer,      // Store the answer value
                files: files.map(file => file.path) // Attach file paths to each answer
            };
        });

        // Save the answers to MongoDB
        await Answer.create(savedAnswers);

        res.status(201).json({ message: 'Form submitted successfully with files' });
    } catch (error) {
        console.error('Error submitting form:', error); // Log the entire error
        res.status(500).json({ error: 'Failed to submit form', details: error.message });
    }
};


// const Answer = require('../models/Answer');
// const mongoose = require('mongoose');

// exports.submitAnswer = async (req, res) => {
//     try {
//         const answers = req.body.answers;

//         for (let questionId in answers) {
//             console.log('Processing answer:', questionId, answers[questionId]);

//             if (!mongoose.Types.ObjectId.isValid(questionId)) {
//                 console.error('Invalid question ID:', questionId);
//                 return res.status(400).json({ error: `Invalid question ID: ${questionId}` });
//             }

//             if (!answers[questionId]) {
//                 console.error('Missing answer for question ID:', questionId);
//                 return res.status(400).json({ error: `Missing answer for question ID: ${questionId}` });
//             }

//             const newAnswer = new Answer({
//                 question: questionId,
//                 answer: answers[questionId]
//             });

//             await newAnswer.save();
//         }

//         res.status(201).json({ message: 'Answer(s) submitted successfully' });
//     } catch (error) {
//         console.error('Error saving answer:', error);
//         res.status(500).json({ error: 'Failed to submit answer' });
//     }
// };

// exports.getAnswers = async (req, res) => {
//     try {
//         const answers = await Answer.find().populate('question');
//         res.status(200).json(answers);
//     } catch (error) {
//         res.status(500).json({ error: 'Failed to fetch answers' });
//     }
// };