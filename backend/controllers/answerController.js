// Path: backend/controllers/answerController.js

const Answer = require('../models/Answer');
const User = require('../models/User');

exports.submitAnswer = async (req, res) => {
    try {

        const dummyUser = await User.findOne({ email: 'john.doe@example.com' });

        if (!dummyUser) {
                                      
            return res.status(404).json({ error: 'Dummy user not found' });
        }

        const answers = JSON.parse(req.body.answers); 
        const files = req.files; 

        console.log('Received Answers:', answers);
        console.log('Received Files:', files);

       
        const savedAnswers = answers.map((answer) => ({
            question: answer.question, 
            answer: answer.answer,      
            files: files.map(file => file.path), 
            user: dummyUser._id,       
        }));

     
        await Answer.create(savedAnswers);

        res.status(201).json({ message: 'Form submitted successfully with files and user ID' });
    } catch (error) {
        console.error('Error submitting form:', error);
        res.status(500).json({ error: 'Failed to submit form', details: error.message });
    }
};


