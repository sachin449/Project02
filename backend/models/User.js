// Path: backend/models/User.js

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true, // Ensure unique email addresses
    }
});

module.exports = mongoose.model('User', UserSchema);
