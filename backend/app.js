// // backend/app.js
// const express = require('express');
// const cors = require('cors');
// const questionRoutes = require('./routes/questionRoutes');
// const answerRoutes = require('./routes/answerRoutes');

// const app = express();

// // Middleware
// app.use(cors({
//     origin: 'http://localhost:5173', // Update with your frontend URL if different
// }));
// app.use(express.json());

// // Routes
// app.use('/api/questions', questionRoutes);
// app.use('/api/answers', answerRoutes);

// module.exports = app;

// Path: backend/app.js

const express = require('express');
const cors = require('cors');
const questionRoutes = require('./routes/questionRoutes');
const answerRoutes = require('./routes/answerRoutes');

const app = express();

// Middleware
app.use(cors({
    origin: 'http://localhost:5173', // Update with your frontend URL if needed
}));
app.use(express.json()); // For parsing JSON in request bodies

// Routes
app.use('/api/questions', questionRoutes); // Route for questions
app.use('/api/answers', answerRoutes);     // Route for submitting answers

module.exports = app;
