import { useState, useEffect } from 'react';
import axios from 'axios';
import Topbar from '../components/static/Topbar';
import Sidebar from '../components/static/Sidebar';

const HomePage = () => {
    const [categories, setCategories] = useState([]); 
    const [selectedCategory, setSelectedCategory] = useState(null); 
    const [subcategories, setSubcategories] = useState([]); 
    const [questions, setQuestions] = useState([]); 


    useEffect(() => {
        axios.get('http://localhost:5000/api/questions/categories')
            .then(response => {
                setCategories(response.data);
            })
            .catch(error => {
                console.error('Error fetching categories:', error);
            });
    }, []);

  
    const handleCategoryClick = (category) => {
        setSelectedCategory(category);

       
        axios.get(`http://localhost:5000/api/questions/subcategories/${category}`)
            .then(response => {
                setSubcategories(response.data);
            })
            .catch(error => {
                console.error('Error fetching subcategories:', error);
            });
    };

   
    const handleSubcategoryClick = (subcategory) => {
        axios.get(`http://localhost:5000/api/questions/subcategory/${subcategory}`)
            .then(response => {
                setQuestions(response.data); 
            })
            .catch(error => {
                console.error('Error fetching questions:', error);
            });
    };

    return (
        <div className="flex">
          
            <Topbar categories={categories} onCategoryClick={handleCategoryClick} />

           
            {selectedCategory && (
                <Sidebar subcategories={subcategories} onSubcategoryClick={handleSubcategoryClick} />
            )}

       
            <div className="flex-1 ml-64 p-6 mt-16">
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
                    <p>No questions available for the selected subcategory.</p>
                )}
            </div>
        </div>
    );
};

export default HomePage;


