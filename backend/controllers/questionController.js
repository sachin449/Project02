const Question = require('../models/Question');


exports.getCategories = async (req, res) => {
    try {
        const categories = await Question.distinct('category');
        res.status(200).json(categories);
    } catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).json({ error: 'Failed to fetch categories' });
    }
};


exports.getSubcategoriesByCategory = async (req, res) => {
    const { category } = req.params;
    try {
        const subcategories = await Question.distinct('subcategory', { category });
        res.status(200).json(subcategories);
    } catch (error) {
        console.error('Error fetching subcategories:', error);
        res.status(500).json({ error: 'Failed to fetch subcategories' });
    }
};


exports.getQuestionsBySubcategory = async (req, res) => {
    const { subcategory } = req.params;
    try {
        const questions = await Question.find({ subcategory }, 'questionText');
        res.status(200).json(questions);
    } catch (error) {
        console.error('Error fetching questions:', error);
        res.status(500).json({ error: 'Failed to fetch questions' });
    }
};

