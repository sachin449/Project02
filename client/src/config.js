// Path: client/src/config.js
const config = {
    apiBaseUrl: 'http://localhost:5000/api',
    requestTimeout: 10000,
    errorMessages: {
        fetchCategoriesError: 'Error fetching categories',
        fetchSubcategoriesError: 'Error fetching subcategories',
        fetchQuestionsError: 'Error fetching questions',
        noQuestionsAvailable: 'No questions available for the selected subcategory.',
    },
    apiEndpoints: {
        categories: '/questions/categories',
        subcategories: '/questions/subcategories',
        questionsBySubcategory: '/questions/subcategory',
    },
    theme: {
        primaryColor: 'bg-[#01b0f1]',
        textColor: 'text-white',
        sidebarWidth: 'w-64',
    },
};

export default config;
