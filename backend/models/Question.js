
const mongoose = require('mongoose');


const FieldSchema = new mongoose.Schema({
    label: { 
        type: String,
        required: true,
    },
    type: { 
        type: String,
        enum: ['string', 'number', 'dropdown', 'calendar', 'file'],
        required: true,
    },
    options: { 
        type: [String], 
        required: function() { return this.type === 'dropdown'; }
    },
    placeholder: { 
        type: String,
        default: ''
    },
    required: {
        type: Boolean,
        default: false
    },
    min: { 
        type: Number, 
        required: function() { return this.type === 'number'; }
    },
    max: {
        type: Number, 
        required: function() { return this.type === 'number'; }
    },
    fieldCreatedAt: {
        type: Date,
        default: Date.now,
    },
    fieldUpdatedAt: { 
        type: Date,
        default: Date.now,
    }
}, { _id: false });


const QuestionSchema = new mongoose.Schema({
    questionText: { 
        type: String,
        required: true,
    },
    category: { 
        type: String,
        required: true,
    },
    subCategory: {
        type: String,
        required: true,
    },
    questionFields: {
        type: [FieldSchema], 
        required: true,
    }
}, { 
    timestamps: true 
});

module.exports = mongoose.model('Question', QuestionSchema);
