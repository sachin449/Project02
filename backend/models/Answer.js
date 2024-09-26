const mongoose = require('mongoose');


const AnswerSubmissionSchema = new mongoose.Schema({
    answer: {
        type: mongoose.Schema.Types.Mixed, 
        required: true
    },
    files: {
        type: [String], 
        default: []
    },
    submittedAt: {
        type: Date,
        default: Date.now 
    }
});


const AnswerSchema = new mongoose.Schema({
    question: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Question', 
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true
    },
    submissions: [AnswerSubmissionSchema] 
});

module.exports = mongoose.model('Answer', AnswerSchema);
