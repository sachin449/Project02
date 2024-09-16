import { useState, useEffect } from 'react';
import axios from 'axios';
import Topbar from '../components/static/Topbar';
import Sidebar from '../components/static/Sidebar';

const HomePage = () => {
    const [categories, setCategories] = useState([]); // Store all categories
    const [selectedCategory, setSelectedCategory] = useState(null); // Store selected category
    const [subcategories, setSubcategories] = useState([]); // Store subcategories for the selected category
    const [questions, setQuestions] = useState([]); // Store questions for the selected subcategory

    // Fetch categories on component mount
    useEffect(() => {
        axios.get('http://localhost:5000/api/questions/categories')
            .then(response => {
                setCategories(response.data); // Store categories fetched from the backend
            })
            .catch(error => {
                console.error('Error fetching categories:', error);
            });
    }, []);

    // Handle category click and fetch subcategories based on the selected category
    const handleCategoryClick = (category) => {
        setSelectedCategory(category); // Set the selected category

        // Fetch subcategories for the selected category
        axios.get(`http://localhost:5000/api/questions/subcategories/${category}`)
            .then(response => {
                setSubcategories(response.data); // Store subcategories fetched from backend
            })
            .catch(error => {
                console.error('Error fetching subcategories:', error);
            });
    };

    // Handle subcategory click and fetch questions for that subcategory
    const handleSubcategoryClick = (subcategory) => {
        axios.get(`http://localhost:5000/api/questions/subcategory/${subcategory}`)
            .then(response => {
                setQuestions(response.data); // Store questions fetched from backend
            })
            .catch(error => {
                console.error('Error fetching questions:', error);
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

            {/* Main content area to display questions */}
            <div className="flex-1 p-6 mt-16">
                <h1 className="text-3xl font-bold">Questions for the selected subcategory</h1>
                {questions.length > 0 ? (
                    questions.map((question, index) => (
                        <div key={index} className="mt-4">
                            <h3 className="text-lg font-semibold">{question.questionText}</h3> {/* Display questionText */}
                        </div>
                    ))
                ) : (
                    <p>No questions available for the selected subcategory.</p>
                )}
            </div>
        </div>
    );
};

export default HomePage;


// // src/pages/HomePage.jsx
// import React from 'react';
// import { Link } from 'react-router-dom';

// function HomePage() {
//     return (
//         <div className="text-center">
//             <h1 className="text-2xl font-bold mb-4">Welcome to the Dynamic Form App</h1>
//             <Link to="/form">
//                 <button className="bg-blue-500 text-white py-2 px-4 rounded">Start Form</button>
//             </Link>
//         </div>
//     );
// }

// export default HomePage;