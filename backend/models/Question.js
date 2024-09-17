// Path: backend/models/Question.js

const mongoose = require('mongoose');

// Schema for dynamic fields in a question
const FieldSchema = new mongoose.Schema({
    label: { // Label for the input field (e.g., Name, Age)
        type: String,
        required: true,
    },
    type: { // The type of input field (string, dropdown, number, etc.)
        type: String,
        enum: ['string', 'number', 'dropdown', 'calendar', 'file'],
        required: true,
    },
    options: { // For dropdown options (e.g., Yes/No, Yes/No/NA, numbers, etc.)
        type: [String],
        required: function() { return this.type === 'dropdown'; }
    },
    placeholder: { // Placeholder for the input field (optional)
        type: String,
        default: ''
    },
    required: { // Whether the field is required or not
        type: Boolean,
        default: false
    },
    min: { // Minimum value (for number input)
        type: Number,
        required: function() { return this.type === 'number'; }
    },
    max: { // Maximum value (for number input)
        type: Number,
        required: function() { return this.type === 'number'; }
    },
    fieldCreatedAt: { // Timestamp when the field was created
        type: Date,
        default: Date.now,
    },
    fieldUpdatedAt: { // Timestamp when the field was last updated
        type: Date,
        default: Date.now,
    }
}, { _id: false });

// Main Question Schema
const QuestionSchema = new mongoose.Schema({
    questionText: { // The main text for the question
        type: String,
        required: true,
    },
    category: { // The category the question belongs to
        type: String,
        required: true,
    },
    subCategory: { // The subcategory the question belongs to
        type: String,
        required: true,
    },
    questionFields: { // An array of fields for this question (dynamic fields)
        type: [FieldSchema], // Each question can have multiple input fields
        required: true,
    }
}, { 
    timestamps: true // Automatically adds createdAt and updatedAt fields
});

module.exports = mongoose.model('Question', QuestionSchema);


// // Path: backend/models/Question.js

// const mongoose = require('mongoose');

// const QuestionSchema = new mongoose.Schema({
//     questionText: {
//         type: String,
//         required: true,
//     },
//     category:{
//         type: String,
//         required: true,
//     },
//     subCategory:{
//         type: String,
//         required: true,
//     }
// });

// module.exports = mongoose.model('Question', QuestionSchema);
