// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import Topbar from '../static/Topbar';
// import Leftbar from '../static/Sidebar';

// const DynamicForm = () => {
//     const [categories, setCategories] = useState([]);  // Categories for the Topbar
//     const [subcategories, setSubcategories] = useState([]);  // Subcategories for the Leftbar
//     const [questions, setQuestions] = useState([]);  // Questions to be displayed
//     const [selectedCategory, setSelectedCategory] = useState('');  // Selected category
//     const [selectedSubcategory, setSelectedSubcategory] = useState('');  // Selected subcategory
//     const [error, setError] = useState('');  // Error message

//     // Fetch categories on component mount
//     useEffect(() => {
//         axios.get('http://localhost:5000/api/categories')
//             .then(response => {
//                 setCategories(response.data);  // Set categories in the Topbar
//             })
//             .catch(error => console.error('Error fetching categories:', error));
//     }, []);

//     // Handle category click (fetch subcategories)
//     const handleCategoryClick = (category) => {
//         setSelectedCategory(category);  // Update selected category
//         setQuestions([]);  // Reset questions when a new category is selected

//         // Fetch subcategories for the selected category
//         axios.get(`http://localhost:5000/api/subcategories/${category}`)
//             .then(response => {
//                 setSubcategories(response.data);  // Update the Leftbar with subcategories
//             })
//             .catch(error => console.error('Error fetching subcategories:', error));
//     };

//     // Handle subcategory click (fetch questions)
//     const handleSubcategoryClick = (subcategory) => {
//         setSelectedSubcategory(subcategory);  // Update selected subcategory

//         // Fetch questions for the selected category and subcategory
//         axios.get(`http://localhost:5000/api/questions/${selectedCategory}/${subcategory}`)
//             .then(response => {
//                 setQuestions(response.data);  // Update questions to be displayed
//             })
//             .catch(error => console.error('Error fetching questions:', error));
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();

//         if (!questions.length) {
//             setError('Please select a category and subcategory');
//             return;
//         }

//         // Handle form submission here
//         console.log('Form submitted with questions:', questions);
//     };

//     return (
//         <div className="flex">
//             {/* Topbar for categories */}
//             <Topbar categories={categories} onCategoryClick={handleCategoryClick} />

//             {/* Leftbar for subcategories (visible after category selection) */}
//             {selectedCategory && (
//                 <Leftbar subcategories={subcategories} onSubcategoryClick={handleSubcategoryClick} />
//             )}

//             {/* Main content area for questions (visible after subcategory selection) */}
//             <div className="flex-1 ml-64 p-6 mt-10">
//                 {questions.length > 0 ? (
//                     <form onSubmit={handleSubmit} className="space-y-6">
//                         {questions.map((question, index) => (
//                             <div key={question._id} className="flex flex-col space-y-4">
//                                 <h3 className="text-lg font-semibold mt-10">
//                                     {index + 1}. {question.questionText}
//                                 </h3>
//                                 {/* Render question input fields dynamically based on question type */}
//                                 {question.questionType === 'string' && (
//                                     <input
//                                         type="text"
//                                         className="border border-gray-300 p-2 rounded"
//                                         placeholder={`Enter ${question.questionText}`}
//                                     />
//                                 )}
//                                 {question.questionType === 'dropdown' && (
//                                     <select className="border border-gray-300 p-2 rounded">
//                                         <option value="">Select an option</option>
//                                         {question.options.map((option) => (
//                                             <option key={option} value={option}>
//                                                 {option}
//                                             </option>
//                                         ))}
//                                     </select>
//                                 )}
//                                 {/* Add more input types as needed */}
//                             </div>
//                         ))}
//                         <button type="submit" className="bg-[#01b0f1] text-white py-3 px-6 rounded">
//                             Submit
//                         </button>
//                     </form>
//                 ) : (
//                     <p>No questions available</p>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default DynamicForm;

// // import { useState, useEffect } from 'react';
// // import axios from 'axios';
// // import Topbar from '../static/Topbar';
// // import Leftbar from '../static/Leftbar';



// // const DynamicForm = () => {
// //     const [questions, setQuestions] = useState([]);
// //     const [formData, setFormData] = useState({});
// //     const [error, setError] = useState('');
// //     const [subcategories, setSubcategories] = useState([]);



// //     useEffect(() => {
// //         axios.get('http://localhost:5000/api/questions')
// //             .then(response => {
// //                 const fetchedQuestions = response.data;
// //                 setQuestions(fetchedQuestions);

// //                 const uniqueSubcategories = [...new Set(fetchedQuestions.map(q => q.category))];
// //                 setSubcategories(uniqueSubcategories);
               
// //             })
// //             .catch(error => console.error('Error fetching questions:', error));
// //     }, []);

// //     const handleSubmit = (e) => {
// //         e.preventDefault();
       
// //     };

// //     return (
// //         <div className="flex">
            
// //             <Topbar subcategories={subcategories} />
// //             <Leftbar subcategories={subcategories} />

           
// //             <div className="flex-1 ml-64 p-6 mt-10">
// //                 <form onSubmit={handleSubmit} className="space-y-6">
// //                     {error && <p className="text-red-500">{error}</p>}
// //                     {questions.length > 0 ? (
// //                         questions.map((question, index) => (
// //                             <div key={question._id} className="flex flex-col space-y-4">
// //                                 <h3 className="text-lg font-semibold mt-10">
// //                                     {index + 1}. {question.questionText}
// //                                 </h3>
// //                             </div>
// //                         ))
// //                     ) : (
// //                         <p>No questions available</p>
// //                     )}
// //                     <button type="submit" className="bg-[#01b0f1] text-white py-3 px-6 rounded">
// //                         Submit
// //                     </button>
// //                 </form>
// //             </div>
// //         </div>
// //     );
// // };

// // export default DynamicForm;
