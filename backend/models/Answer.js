// Path: backend/models/Answer.js

const mongoose = require('mongoose');

const AnswerSchema = new mongoose.Schema({
    question: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question',
        required: true,
    },
    answer: {
        type: mongoose.Schema.Types.Mixed, // To store various types of answers
        required: true,
    },
    files: [String], // Array of file paths
    user: { // Reference to the user who submitted the answer
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
});

module.exports = mongoose.model('Answer', AnswerSchema);


// // Path: backend/models/Answer.js

// const mongoose = require('mongoose');

// const AnswerSchema = new mongoose.Schema({
//     question: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Question',
//         required: true,
//     },
//     answer: {
//         type: mongoose.Schema.Types.Mixed, // To store various types of answers
//         required: true,
//     },
//     files: [String], // Array of file paths
// });

// module.exports = mongoose.model('Answer', AnswerSchema);
