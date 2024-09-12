// Path: client/src/components/dynamic/DynamicForm.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DynamicForm = () => {
    const [questions, setQuestions] = useState([]);
    const [formData, setFormData] = useState({});
    const [files, setFiles] = useState({}); // To store files for each question
    const [error, setError] = useState(''); // Error message for validation

    useEffect(() => {
        // Fetch questions from the backend
        axios.get('http://localhost:5000/api/questions')
            .then(response => {
                console.log('Fetched questions:', response.data);
                setQuestions(response.data);
            })
            .catch(error => console.error('Error fetching questions:', error));
    }, []);

    // Handle text inputs
    const handleChange = (e, questionId, field) => {
        const value = e.target.value;
        if (field) {
            setFormData(prevState => ({
                ...prevState,
                [questionId]: {
                    ...prevState[questionId],
                    [field]: value,
                },
            }));
        } else {
            setFormData({
                ...formData,
                [questionId]: value,
            });
        }
    };

    // Handle file uploads
    const handleFileUpload = (e, questionId) => {
        const uploadedFiles = e.target.files; // List of files
        setFiles({
            ...files,
            [questionId]: uploadedFiles, // Store files for the corresponding question
        });
    };

    // Validate the form before submission
    const validateForm = () => {
        for (const question of questions) {
            const answer = formData[question._id];

            // Check if the answer is missing for required questions
            if (!answer || (typeof answer === 'object' && Object.values(answer).some(val => !val))) {
                setError(`Please fill all required fields for Question ${question.questionText}`);
                return false;
            }
        }
        setError(''); // Clear error message if all validations pass
        return true;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate the form before proceeding
        if (!validateForm()) {
            return; // If validation fails, do not submit the form
        }

        const formDataToSend = new FormData(); // FormData for multipart/form-data

        // Format the formData with questionId and answer
        const formattedData = Object.entries(formData).map(([questionId, answer]) => ({
            question: questionId,  // Use "question" key explicitly for backend
            answer                  // Include the answer text or object
        }));

        console.log("Formatted answers data:", formattedData);

        // Append the text data (answers) to FormData
        formDataToSend.append('answers', JSON.stringify(formattedData));

        // Append files for each question
        Object.keys(files).forEach(questionId => {
            Array.from(files[questionId]).forEach(file => {
                formDataToSend.append('files', file); // Append each file to the formData
            });
        });

        // Send data to the backend
        axios.post('http://localhost:5000/api/answers/submit', formDataToSend)
            .then(response => {
                alert('Form submitted successfully!');
                // Reset form data after submission
                setFormData({});
                setFiles({});
            })
            .catch(error => {
                if (error.response) {
                    console.error('Server responded with error:', error.response.data);
                } else if (error.request) {
                    console.error('No response received:', error.request);
                } else {
                    console.error('Error in setting up request:', error.message);
                }
            });
    };

    return (
        <div className="flex">
            {/* Sidebar */}
            <div className="w-64 fixed left-0 top-0 h-full bg-gray-100 p-4 shadow-md">
                <h2 className="text-4xl font-bold ml-14 mt-10 mb-20">Menu</h2>
                <ul className="space-y-8">
                    <li><button className="w-full bg-blue-500 text-white text-lg font-semibold py-5 px-4 rounded-xl">subcategory 1</button></li>
                    <li><button className="w-full bg-blue-500 text-white text-lg font-semibold py-5 px-4 rounded-xl">subcategory 2</button></li>
                    <li><button className="w-full bg-blue-500 text-white text-lg font-semibold py-5 px-4 rounded-xl">subcategory 3</button></li>
                    <li><button className="w-full bg-blue-500 text-white text-lg font-semibold py-5 px-4 rounded-xl">subcategory 4</button></li>
                    <li><button className="w-full bg-blue-500 text-white text-lg font-semibold py-5 px-4 rounded-xl">subcategory 5</button></li>
                </ul>
            </div>

            {/* Main form area */}
            <div className="flex-1 ml-64 p-6"> {/* Added ml-64 to provide space for sidebar */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Display validation error */}
                    {error && <p className="text-red-500">{error}</p>}

                    {questions.length > 0 ? (
                        questions.map((question, index) => (
                            <div key={question._id} className="flex flex-col space-y-4">
                                <h3 className="text-lg font-semibold mt-10">
                                    {index + 1}. {question.questionText} {/* Display question number */}
                                </h3>
                                {question.questionType === 'string' && (
                                    <input
                                        type="text"
                                        onChange={(e) => handleChange(e, question._id)}
                                        className="border border-gray-300 p-2 rounded"
                                        value={formData[question._id] || ''}
                                        placeholder="Enter your answer"
                                        required
                                    />
                                )}
                                {question.questionType === 'dropdown' && (
                                    <select
                                        onChange={(e) => handleChange(e, question._id)}
                                        className="border border-gray-300 p-2 rounded"
                                        value={formData[question._id] || ''}
                                        required
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
                                    <div className="space-y-4">
                                        <input
                                            type="text"
                                            placeholder="Name"
                                            onChange={(e) => handleChange(e, question._id, 'name')}
                                            className="border border-gray-300 p-2 rounded mb-2"
                                            value={formData[question._id]?.name || ''}
                                            required
                                        />
                                        <input
                                            type="text"
                                            placeholder="Job Title"
                                            onChange={(e) => handleChange(e, question._id, 'jobTitle')}
                                            className="border border-gray-300 p-2 rounded"
                                            value={formData[question._id]?.jobTitle || ''}
                                            required
                                        />
                                    </div>
                                )}
                                {/* File Upload Input */}
                                {question.uploadFile && (
                                    <div>
                                        <label className="text-gray-700">Upload File(s):</label>
                                        <input
                                            type="file"
                                            multiple
                                            onChange={(e) => handleFileUpload(e, question._id)}
                                            className="border border-gray-300 p-2 rounded"
                                            required
                                        />
                                    </div>
                                )}
                            </div>
                        ))
                    ) : (
                        <p>No questions available</p>
                    )}
                    <button type="submit" className="bg-blue-500 text-white py-3 px-6 rounded">
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default DynamicForm;
