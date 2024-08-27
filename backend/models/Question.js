// backend/models/Question.js
const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
    questionText: {
        type: String,
        required: true,
    },
    questionType: {
        type: String,
        enum: ['string', 'dropdown', 'multiple'],
        required: true,
    },
    options: {
        type: [String],
        required: function() { return this.questionType !== 'string'; }
    },
    category:{
        type: String,
        required: true,
    },
    subCategory:{
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('Question', QuestionSchema);