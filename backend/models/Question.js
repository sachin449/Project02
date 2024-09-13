// const mongoose = require('mongoose');

// // Schema for dynamic fields in questions
// const FieldSchema = new mongoose.Schema({
//     label: {
//         type: String,
//         required: true,
//     },
//     type: {
//         type: String,
//         enum: ['string', 'dropdown', 'dropdownNumber', 'fileUpload'], // Existing types; more can be added later
//         required: true,
//     },
//     value: {
//         type: mongoose.Schema.Types.Mixed, // Supports various types (string, number, file, etc.)
//         default: null,
//     },
//     options: {
//         type: [String], // For dropdowns (e.g., Yes, No, NA, etc.)
//         required: function() { return this.type === 'dropdown' || this.type === 'dropdownNumber'; }
//     },
//     placeholder: {
//         type: String,
//         default: ''
//     }
// }, { _id: false }); // Disable _id for fields as they don’t need unique identifiers

// // Main Question Schema
// const QuestionSchema = new mongoose.Schema({
//     questionNumber: {
//         type: Number,
//         required: true,
//         unique: true, // Ensures each question has a unique number
//     },
//     questionText: {
//         type: String,
//         required: true,
//     },
//     questionExplanation: {
//         type: String,
//         default: '',
//     },
//     subQuestionExplanation: {
//         type: String,
//         default: '',
//     },
//     category: {
//         type: String,
//         required: true,
//     },
//     subCategory: {
//         type: String,
//         required: true,
//     },
//     fields: {
//         type: [FieldSchema], // An array of fields for each question
//         required: true,
//     }
// }, { timestamps: true }); // Automatically adds createdAt and updatedAt fields

// module.exports = mongoose.model('Question', QuestionSchema);




// Path: backend/models/Question.js

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
