// Path: backend/models/Answer.js

const mongoose = require('mongoose');

const AnswerSchema = new mongoose.Schema({
    question: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question',
        required: true,
    },
    answer: {
        type: mongoose.Schema.Types.Mixed, 
        required: true,
    },
    files: [String], 
    user: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
});

module.exports = mongoose.model('Answer', AnswerSchema);
