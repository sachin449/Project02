const Answer = require('../models/Answer');
const User = require('../models/User');
const Question = require('../models/Question'); // Assuming this exists

// Submit Answer Logic
exports.submitAnswer = async (req, res) => {
    try {
        const userId = req.body.userId;
        if (!userId) {
            return res.status(400).json({ error: 'User ID is missing in the request' });
        }

        // Validate user existence
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const answers = req.body.answers ? JSON.parse(req.body.answers) : null;
        if (!answers) {
            return res.status(400).json({ error: 'Answers are missing in the request body' });
        }

        const files = req.files || [];

        for (const questionId in answers) {
            const answerContent = answers[questionId];

            // Check if the answer for the question already exists for the user
            let answerDoc = await Answer.findOne({ question: questionId, user: userId });

            // Create a new submission object with answer content and files
            const newSubmission = {
                answer: answerContent,
                files: files.length > 0 ? files.map(file => file.path) : [],
                submittedAt: new Date()
            };

            if (answerDoc) {
                // If an answer already exists, add the new submission to the existing answer
                answerDoc.submissions.push(newSubmission);
            } else {
                // Otherwise, create a new answer document
                answerDoc = new Answer({
                    question: questionId,
                    user: userId,
                    submissions: [newSubmission]
                });
            }

            // Save the answer document
            await answerDoc.save();
        }

        res.status(201).json({ message: 'Form submitted successfully with files and user ID' });
    } catch (error) {
        console.error('Error submitting form:', error);
        res.status(500).json({ error: 'Failed to submit form', details: error.message });
    }
};

// Fetch Answers Logic
exports.fetchAnswers = async (req, res) => {
    try {
        const { userId, subcategoryId } = req.query;

        // Validate user existence
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Fetch all questions for the provided subcategory
        const questions = await Question.find({ subCategory: subcategoryId });

        // Fetch the user's answers for the questions in the subcategory
        const answers = await Answer.find({
            user: userId,
            question: { $in: questions.map(q => q._id) }
        });

        // Structure the answers as a map of questionId to the latest submission
        const answersMap = {};
        answers.forEach(answer => {
            const latestSubmission = answer.submissions[answer.submissions.length - 1];
            answersMap[answer.question] = {
                answer: latestSubmission.answer,
                files: latestSubmission.files || []
            };
        });

        // Return the structured answers map
        res.status(200).json(answersMap);
    } catch (error) {
        console.error('Error fetching answers:', error);
        res.status(500).json({ error: 'Failed to fetch answers', details: error.message });
    }
};

// Fetch Progress for Categories Logic (UPDATED)
exports.getCategoryProgress = async (req, res) => {
    try {
        const { userId } = req.query;

        // Validate user existence
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Fetch all categories (Assuming each question has a 'category' field)
        const categories = await Question.distinct('category');

        const progressMap = {};

        for (const category of categories) {
            // Fetch all questions for the category
            const questions = await Question.find({ category });

            let filledQuestionsCount = 0;

            for (const question of questions) {
                const answer = await Answer.findOne({ question: question._id, user: userId });
                if (answer && answer.submissions.length > 0) {
                    filledQuestionsCount++;
                }
            }

            // Calculate the progress percentage
            const totalQuestions = questions.length;
            const progressPercentage = totalQuestions
                ? Math.round((filledQuestionsCount / totalQuestions) * 100)
                : 0;

            progressMap[category] = progressPercentage;
        }

        // Return the progress map
        res.status(200).json(progressMap);
    } catch (error) {
        console.error('Error fetching category progress:', error);
        res.status(500).json({ error: 'Failed to fetch progress', details: error.message });
    }
};
