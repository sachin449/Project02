// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import DynamicForm from './components/dynamic/DynamicForm';

function App() {
    return (
        <div className="App container mx-auto p-4">
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/form" element={<DynamicForm />} />
            </Routes>
        </div>
    );
}

export default App;