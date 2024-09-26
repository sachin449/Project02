import { useState, useEffect } from 'react';
import axios from 'axios';
import Topbar from '../components/static/Topbar';
import Sidebar from '../components/static/Sidebar';

const HomePage = () => {
    const apiBaseUrl = 'http://localhost:5000/api';
    const requestTimeout = 10000;
    const errorMessages = {
        fetchCategoriesError: 'Error fetching categories',
        fetchSubcategoriesError: 'Error fetching subcategories',
        fetchQuestionsError: 'Error fetching questions',
        noQuestionsAvailable: 'No questions available for the selected subcategory.',
    };

    const apiEndpoints = {
        categories: '/questions/categories',
        subcategories: '/questions/subcategories',
        questionsBySubcategory: '/questions/subcategory',
        submitAnswer: '/answers/submit-answers',
        fetchAnswers: '/answers/fetch-answers',
        subcategoryProgress: '/answers/progress', // New endpoint for fetching progress
    };

    const hardcodedUserId = '66f281cc26d9390040d6ea06';

    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [subcategories, setSubcategories] = useState([]);
    const [selectedSubcategory, setSelectedSubcategory] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [formData, setFormData] = useState({});
    const [files, setFiles] = useState({});
    const [errors, setErrors] = useState({});
    const [progress, setProgress] = useState({});  // Store progress for categories

    // Fetch categories with progress
    useEffect(() => {
        axios.get(`${apiBaseUrl}${apiEndpoints.categories}`, { timeout: requestTimeout })
            .then(response => {
                console.log('Categories fetched:', response.data);
                setCategories(response.data);

                // Fetch progress for categories
                axios.get(`${apiBaseUrl}${apiEndpoints.subcategoryProgress}`, {
                    params: { userId: hardcodedUserId }
                }).then(progressResponse => {
                    console.log('Progress fetched:', progressResponse.data);
                    setProgress(progressResponse.data); // Set progress for each category
                }).catch(() => {
                    console.error('Error fetching progress');
                });
            })
            .catch(() => {
                console.error(errorMessages.fetchCategoriesError);
            });
    }, []);

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
        axios.get(`${apiBaseUrl}${apiEndpoints.subcategories}/${category}`, { timeout: requestTimeout })
            .then(response => {
                console.log('Subcategories fetched:', response.data);
                setSubcategories(response.data);
            })
            .catch(() => {
                console.error(errorMessages.fetchSubcategoriesError);
            });
    };

    const handleSubcategoryClick = (subcategory) => {
        setSelectedSubcategory(subcategory);

        // Fetch questions for the selected subcategory
        axios.get(`${apiBaseUrl}${apiEndpoints.questionsBySubcategory}/${subcategory}`, { timeout: requestTimeout })
            .then(response => {
                console.log('Questions fetched:', response.data);
                setQuestions(response.data);

                // Fetch previously submitted answers
                axios.get(`${apiBaseUrl}${apiEndpoints.fetchAnswers}`, {
                    params: {
                        userId: hardcodedUserId,
                    }
                }).then(answerResponse => {
                    console.log('Previous answers fetched:', answerResponse.data);
                    const previousAnswers = answerResponse.data;
                    const updatedFormData = {};

                    // Populate form data with previous answers
                    response.data.forEach(question => {
                        const answer = previousAnswers[question._id];
                        if (answer) {
                            updatedFormData[question._id] = answer.answer;
                        }
                    });

                    setFormData(updatedFormData);
                }).catch(() => {
                    console.error('Error fetching previous answers');
                });
            })
            .catch(() => {
                console.error(errorMessages.fetchQuestionsError);
            });
    };

    const handleInputChange = (e, questionId, field) => {
        const value = e.target.value;
        setFormData(prevState => ({
            ...prevState,
            [questionId]: {
                ...prevState[questionId],
                [field]: value,
            },
        }));
        setErrors(prevErrors => ({
            ...prevErrors,
            [questionId]: {
                ...prevErrors[questionId],
                [field]: null,
            },
        }));
    };

    const handleFileUpload = (e, questionId) => {
        const uploadedFiles = e.target.files;
        setFiles(prevState => ({
            ...prevState,
            [questionId]: uploadedFiles,
        }));
    };

    const validateForm = () => {
        let valid = true;
        const newErrors = {};

        questions.forEach((question) => {
            question.questionFields.forEach((field) => {
                const value = formData[question._id] && formData[question._id][field.label];

                if (field.required && (!value || value.trim() === '')) {
                    valid = false;
                    if (!newErrors[question._id]) {
                        newErrors[question._id] = {};
                    }
                    newErrors[question._id][field.label] = 'This field is required';
                }

                if (field.type === 'file' && field.required) {
                    const uploadedFiles = files[question._id];
                    if (!uploadedFiles || uploadedFiles.length === 0) {
                        valid = false;
                        if (!newErrors[question._id]) {
                            newErrors[question._id] = {};
                        }
                        newErrors[question._id][field.label] = 'Please upload a file';
                    }
                }
            });
        });

        setErrors(newErrors);
        return valid;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validateForm()) {
            alert('Please fill out all required fields.');
            return;
        }

        const formDataToSend = new FormData();
        formDataToSend.append('userId', hardcodedUserId);

        const answersToSend = {};
        questions.forEach((question) => {
            answersToSend[question._id] = formData[question._id];
        });
        formDataToSend.append('answers', JSON.stringify(answersToSend));

        Object.keys(files).forEach((questionId) => {
            Array.from(files[questionId]).forEach((file) => {
                formDataToSend.append('files', file);
            });
        });

        axios.post(`${apiBaseUrl}${apiEndpoints.submitAnswer}`, formDataToSend, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        .then(response => alert('Form submitted successfully!'))
        .catch(error => console.error('Error submitting form:', error));
    };

    return (
        <div className="flex">
            <Topbar categories={categories} onCategoryClick={handleCategoryClick} progress={progress} />  {/* Pass progress */}
            {selectedCategory && (
                <Sidebar
                    subcategories={subcategories}
                    onSubcategoryClick={handleSubcategoryClick}
                    selectedSubcategory={selectedSubcategory}
                />
            )}

            <div className="flex-1 ml-28 p-4 md:p-6 mt-16 max-w-7xl mx-auto">
                {questions.length > 0 ? (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {questions.map((question, index) => (
                            <div key={question._id} className="space-y-4">
                                <h3 className="text-left text-sm font-semibold md:mb-2">
                                    {index + 1}. {question.questionText}
                                </h3>
                                <div className="grid grid-cols-1 gap-6">
                                    {question.questionFields.map((field, fieldIndex) => (
                                        <div key={fieldIndex} className="flex flex-col items-start space-y-1">
                                            <label className="text-xs text-left mb-2 text-gray-700">
                                                {field.label}
                                            </label>
                                            <div className="w-full grid">
                                                {field.type === 'string' && (
                                                    <input
                                                        type="text"
                                                        placeholder={field.placeholder || 'Enter text'}
                                                        value={formData[question._id]?.[field.label] || ''}  // Pre-fill if data exists
                                                        className={`border border-gray-300 p-2 rounded-lg w-full shadow-sm focus:ring focus:ring-blue-200 text-xs ${
                                                            errors[question._id] && errors[question._id][field.label] ? 'border-red-500' : ''
                                                        }`}
                                                        onChange={(e) => handleInputChange(e, question._id, field.label)}
                                                    />
                                                )}
                                                {field.type === 'number' && (
                                                    <input
                                                        type="number"
                                                        placeholder={field.placeholder || 'Enter number'}
                                                        value={formData[question._id]?.[field.label] || ''}  // Pre-fill if data exists
                                                        className={`border border-gray-300 p-2 rounded-lg w-full shadow-sm focus:ring focus:ring-blue-200 text-xs ${
                                                            errors[question._id] && errors[question._id][field.label] ? 'border-red-500' : ''
                                                        }`}
                                                        onChange={(e) => handleInputChange(e, question._id, field.label)}
                                                    />
                                                )}
                                                {field.type === 'dropdown' && (
                                                    <select
                                                        value={formData[question._id]?.[field.label] || ''}  // Pre-fill if data exists
                                                        className={`border border-gray-300 p-2 rounded-lg w-full shadow-sm focus:ring focus:ring-blue-200 text-xs ${
                                                            errors[question._id] && errors[question._id][field.label] ? 'border-red-500' : ''
                                                        }`}
                                                        onChange={(e) => handleInputChange(e, question._id, field.label)}
                                                    >
                                                        <option value="">Select an option</option>
                                                        {field.options.map((option, optionIndex) => (
                                                            <option key={optionIndex} value={option}>
                                                                {option}
                                                            </option>
                                                        ))}
                                                    </select>
                                                )}
                                                {field.type === 'file' && (
                                                    <input
                                                        type="file"
                                                        multiple
                                                        className={`border border-gray-300 p-2 rounded-lg w-full shadow-sm focus:ring focus:ring-blue-200 text-xs ${
                                                            errors[question._id] && errors[question._id][field.label] ? 'border-red-500' : ''
                                                        }`}
                                                        onChange={(e) => handleFileUpload(e, question._id)}
                                                    />
                                                )}
                                                {errors[question._id] && errors[question._id][field.label] && (
                                                    <span className="text-red-500 text-xs">{errors[question._id][field.label]}</span>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                        <button type="submit" className="text-[#01B0F1] hover:bg-blue-100 hover:text-blue-800 flex flex-wrap-reverse bg-blue-100 py-3 px-6 rounded-lg shadow-md font-semibold text-sm">
                            Submit
                        </button>
                    </form>
                ) : (
                    <p>{errorMessages.noQuestionsAvailable}</p>
                )}
            </div>
        </div>
    );
};

export default HomePage;
