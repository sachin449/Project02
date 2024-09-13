import { useState, useEffect } from 'react';
import axios from 'axios';
import Topbar from '../static/Topbar';
import Leftbar from '../static/Leftbar';



const DynamicForm = () => {
    const [questions, setQuestions] = useState([]);
    const [formData, setFormData] = useState({});
    const [error, setError] = useState('');
    const [subcategories, setSubcategories] = useState([]);



    useEffect(() => {
        axios.get('http://localhost:5000/api/questions')
            .then(response => {
                const fetchedQuestions = response.data;
                setQuestions(fetchedQuestions);

                const uniqueSubcategories = [...new Set(fetchedQuestions.map(q => q.category))];
                setSubcategories(uniqueSubcategories);
            })
            .catch(error => console.error('Error fetching questions:', error));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
       
    };

    return (
        <div className="flex">
            
            <Topbar subcategories={subcategories} />
            <Leftbar subcategories={subcategories} />

           
            <div className="flex-1 ml-64 p-6 mt-10">
                <form onSubmit={handleSubmit} className="space-y-6">
                    {error && <p className="text-red-500">{error}</p>}
                    {questions.length > 0 ? (
                        questions.map((question, index) => (
                            <div key={question._id} className="flex flex-col space-y-4">
                                <h3 className="text-lg font-semibold mt-10">
                                    {index + 1}. {question.questionText}
                                </h3>
                            </div>
                        ))
                    ) : (
                        <p>No questions available</p>
                    )}
                    <button type="submit" className="bg-[#01b0f1] text-white py-3 px-6 rounded">
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default DynamicForm;
