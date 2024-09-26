const express = require('express');
const cors = require('cors');
const questionRoutes = require('./routes/questionRoutes');
const answerRoutes = require('./routes/answerRoutes');
const path = require('path'); 


const app = express();


app.use(cors({
    origin: 'http://localhost:5173', 
}));


app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.use('/api/questions', questionRoutes);
app.use('/api/answers', answerRoutes); 

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!', message: err.message });
});

module.exports = app;
