// Path: src/App.jsx

import React from 'react';
import HomePage from './pages/HomePage'; // Update this to match the new HomePage component
import './App.css';

function App() {
    return (
        <div className="App">
            <HomePage />
        </div>
    );
}

export default App;







// // src/App.jsx
// import React from 'react';
// import { Routes, Route } from 'react-router-dom';
// import HomePage from './pages/HomePage';
// import DynamicForm from './components/dynamic/DynamicForm';

// function App() {
//     return (
//         <div className="App container mx-auto p-4">
//             <Routes>
//                 <Route path="/" element={<HomePage />} />
                
//             </Routes>
//         </div>
//     );
// }

// export default App;