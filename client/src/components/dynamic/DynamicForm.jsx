// Path: client/src/components/dynamic/DynamicForm.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DynamicForm = () => {
    const [questions, setQuestions] = useState([]);
    const [formData, setFormData] = useState({});
    const [files, setFiles] = useState({}); // To store files for each question

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

    const handleSubmit = (e) => {
        e.preventDefault();

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
            .then(response => alert('Form submitted successfully!'))
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
                                value={formData[question._id] || ''}
                                placeholder="Enter your answer"
                            />
                        )}
                        {question.questionType === 'dropdown' && (
                            <select
                                onChange={(e) => handleChange(e, question._id)}
                                className="border border-gray-300 p-2 rounded"
                                value={formData[question._id] || ''}
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
                                />
                                <input
                                    type="text"
                                    placeholder="Job Title"
                                    onChange={(e) => handleChange(e, question._id, 'jobTitle')}
                                    className="border border-gray-300 p-2 rounded"
                                    value={formData[question._id]?.jobTitle || ''}
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
                                />
                            </div>
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


// // client\src\components\dynamic\DynamicForm.jsx


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const DynamicForm = () => {
//     const [questions, setQuestions] = useState([]);
//     const [formData, setFormData] = useState({});

//     useEffect(() => {
//         // Fetch questions from the backend
//         axios.get('http://localhost:5000/api/questions')
//             .then(response => {
//                 console.log('Fetched questions:', response.data);
//                 setQuestions(response.data);
//             })
//             .catch(error => console.error('Error fetching questions:', error));
//     }, []);

//     const handleChange = (e, questionId, field) => {
//         const value = e.target.value;

//         if (field) {
//             setFormData(prevState => ({
//                 ...prevState,
//                 [questionId]: {
//                     ...prevState[questionId],
//                     [field]: value,
//                 },
//             }));
//         } else {
//             setFormData({
//                 ...formData,
//                 [questionId]: value,
//             });
//         }
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();

//         const formattedData = Object.entries(formData).reduce((acc, [key, value]) => {
//             if (typeof value === 'object' && value.name && value.jobTitle) {
//                 acc[key] = {
//                     name: value.name,
//                     jobTitle: value.jobTitle,
//                 };
//             } else {
//                 acc[key] = value;
//             }
//             return acc;
//         }, {});

//         axios.post('http://localhost:5000/api/answers', {
//             answers: formattedData,
//         })
//             .then(response => alert('Form submitted successfully!'))
//             .catch(error => {
//                 if (error.response) {
//                     console.error('Server responded with error:', error.response.data);
//                     console.error('Status code:', error.response.status);
//                 } else if (error.request) {
//                     console.error('No response received:', error.request);
//                 } else {
//                     console.error('Error in setting up request:', error.message);
//                 }
//                 console.error('Axios config:', error.config);
//             });
//     };

//     return (
//         <form onSubmit={handleSubmit} className="space-y-4">
//             {questions.length > 0 ? (
//                 questions.map(question => (
//                     <div key={question._id} className="flex flex-col">
//                         <label className="mb-2 text-lg font-semibold">
//                             {question.questionText}
//                         </label>
//                         {question.questionType === 'string' && (
//                             <input
//                                 type="text"
//                                 onChange={(e) => handleChange(e, question._id)}
//                                 className="border border-gray-300 p-2 rounded"
//                                 value={formData[question._id] || ''}
//                                 placeholder="Enter your answer"
//                             />
//                         )}
//                         {question.questionType === 'dropdown' && (
//                             <select
//                                 onChange={(e) => handleChange(e, question._id)}
//                                 className="border border-gray-300 p-2 rounded"
//                                 value={formData[question._id] || ''}
//                             >
//                                 <option value="">Select an option</option>
//                                 {question.options.map(option => (
//                                     <option key={option} value={option}>
//                                         {option}
//                                     </option>
//                                 ))}
//                             </select>
//                         )}
//                         {question.questionType === 'multiple' && (
//                             <div className="space-y-4">
//                                 <input
//                                     type="text"
//                                     placeholder="Name"
//                                     onChange={(e) => handleChange(e, question._id, 'name')}
//                                     className="border border-gray-300 p-2 rounded mb-2"
//                                     value={formData[question._id]?.name || ''}
//                                 />
//                                 <input
//                                     type="text"
//                                     placeholder="Job Title"
//                                     onChange={(e) => handleChange(e, question._id, 'jobTitle')}
//                                     className="border border-gray-300 p-2 rounded"
//                                     value={formData[question._id]?.jobTitle || ''}
//                                 />
//                             </div>
//                         )}
//                     </div>
//                 ))
//             ) : (
//                 <p>No questions available</p>
//             )}
//             <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
//                 Submit
//             </button>
//         </form>
//     );
// };

// export default DynamicForm;
