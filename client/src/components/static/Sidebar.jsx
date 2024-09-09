// src/components/static/Sidebar.jsx
import React from 'react';

const Sidebar = ({ selectedCategory, setSelectedCategory }) => {
    const categories = [
        'Human Resource',
        'Environment',
        'Community Relation',
        'Health and Safety',
        'Other General Info'
    ];

    return (
        <div className="w-64 h-screen bg-gray-800 text-white">
            <div className="p-4">
                <h2 className="text-xl font-semibold mb-4">Subcategories</h2>
                <div className="space-y-2">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`w-full text-left py-2 px-4 rounded ${
                                selectedCategory === category ? 'bg-blue-500' : 'bg-gray-700 hover:bg-gray-600'
                            }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
