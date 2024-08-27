// backend/models/Answer.js
const mongoose = require('mongoose');

const AnswerSchema = new mongoose.Schema({
    question: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question',
        required: true,
    },
    answer: {
        type: mongoose.Schema.Types.Mixed, // Mixed to allow different types of answers
        required: true,
    },
});

module.exports = mongoose.model('Answer', AnswerSchema);