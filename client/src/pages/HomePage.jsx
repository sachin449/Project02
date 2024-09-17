// Path: client/src/pages/HomePage.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import Topbar from '../components/static/Topbar';
import Sidebar from '../components/static/Sidebar';
import config from '../config'; // Import config

const HomePage = () => {
    const [categories, setCategories] = useState([]); 
    const [selectedCategory, setSelectedCategory] = useState(null); 
    const [subcategories, setSubcategories] = useState([]); 
    const [questions, setQuestions] = useState([]); 

    useEffect(() => {
        axios.get(`${config.apiBaseUrl}${config.apiEndpoints.categories}`, { timeout: config.requestTimeout }) // Use apiBaseUrl and endpoints from config
            .then(response => {
                setCategories(response.data);
            })
            .catch(() => {
                console.error(config.errorMessages.fetchCategoriesError); // Use error message from config
            });
    }, []);

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);

        axios.get(`${config.apiBaseUrl}${config.apiEndpoints.subcategories}/${category}`, { timeout: config.requestTimeout }) // Use apiBaseUrl and endpoints from config
            .then(response => {
                setSubcategories(response.data);
            })
            .catch(() => {
                console.error(config.errorMessages.fetchSubcategoriesError); // Use error message from config
            });
    };

    const handleSubcategoryClick = (subcategory) => {
        axios.get(`${config.apiBaseUrl}${config.apiEndpoints.questionsBySubcategory}/${subcategory}`, { timeout: config.requestTimeout }) // Use apiBaseUrl and endpoints from config
            .then(response => {
                setQuestions(response.data); 
            })
            .catch(() => {
                console.error(config.errorMessages.fetchQuestionsError); // Use error message from config
            });
    };

    return (
        <div className="flex">
            {/* Topbar always visible */}
            <Topbar categories={categories} onCategoryClick={handleCategoryClick} />

            {/* Sidebar visible only after a category is selected */}
            {selectedCategory && (
                <Sidebar subcategories={subcategories} onSubcategoryClick={handleSubcategoryClick} />
            )}

            {/* Main content area */}
            <div className={`flex-1 ml-64 p-6 mt-16`}>
                <h1 className="text-3xl font-bold mb-6">Questions for the selected subcategory</h1>
                {questions.length > 0 ? (
                    questions.map((question, index) => (
                        <div key={index} className="flex items-start space-x-4 mt-4">
                            <span className="text-lg font-semibold">
                                {index + 1}.
                            </span> 
                            <h3 className="text-lg">
                                {question.questionText}
                            </h3> 
                        </div>
                    ))
                ) : (
                    <p>{config.errorMessages.noQuestionsAvailable}</p> 
                )}
            </div>
        </div>
    );
};

export default HomePage;
