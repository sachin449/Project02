// src/components/dynamic/DynamicForm.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DynamicForm = () => {
    const [questions, setQuestions] = useState([]);
    const [formData, setFormData] = useState({});

    useEffect(() => {
        // Fetch questions from the backend
        axios.get('http://localhost:5000/api/questions')
        .then(response => {
            console.log('Fetched questions:', response.data);
            setQuestions(response.data);
        })
            .catch(error => console.error('Error fetching questions:', error));
    }, []);

    const handleChange = (e, questionId) => {
        setFormData({
            ...formData,
            [questionId]: e.target.value,
        });
    };

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     axios.post('http://localhost:5000/api/answers', {
    //         answers: formData,
    //     })
    //     .then(response => alert('Form submitted successfully!'))
    //     .catch(error => console.error('Error submitting form:', error));
    // };


    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/api/answers', {
            answers: formData,
        })
        .then(response => alert('Form submitted successfully!'))
        .catch(error => {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.error('Server responded with error:', error.response.data);
                console.error('Status code:', error.response.status);
            } else if (error.request) {
                // The request was made but no response was received
                console.error('No response received:', error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.error('Error in setting up request:', error.message);
            }
            console.error('Axios config:', error.config);
        });
    };


    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {questions.length > 0 ? (
                questions.map(question => (
                    <div key={question._id} className="flex flex-col">
                        <label className="mb-2 text-lg font-semibold">
                            {question.questionText}
                        </label>
                        {question.questionType === 'string' && (
                            <input
                                type="text"
                                onChange={(e) => handleChange(e, question._id)}
                                className="border border-gray-300 p-2 rounded"
                            />
                        )}
                        {question.questionType === 'dropdown' && (
                            <select
                                onChange={(e) => handleChange(e, question._id)}
                                className="border border-gray-300 p-2 rounded"
                            >
                                <option value="">Select an option</option>
                                {question.options.map(option => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                        )}
                        {question.questionType === 'multiple' && (
                            question.options.map(option => (
                                <div key={option} className="flex items-center">
                                    <input
                                        type="checkbox"
                                        value={option}
                                        onChange={(e) => handleChange(e, question._id)}
                                        className="mr-2"
                                    />
                                    <label>{option}</label>
                                </div>
                            ))
                        )}
                    </div>
                ))
            ) : (
                <p>No questions available</p>
            )}
            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
                Submit
            </button>
        </form>
    );
};

export default DynamicForm;
