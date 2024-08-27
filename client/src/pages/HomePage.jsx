// src/pages/HomePage.jsx
import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
    return (
        <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Welcome to the Dynamic Form App</h1>
            <Link to="/form">
                <button className="bg-blue-500 text-white py-2 px-4 rounded">Start Form</button>
            </Link>
        </div>
    );
}

export default HomePage;