import React, { useState } from 'react';
import { FaBuilding, FaGlobe, FaTree, FaBolt, FaChartBar } from 'react-icons/fa';

const Topbar = ({ categories, onCategoryClick, progress }) => {
    const [selectedCategory, setSelectedCategory] = useState(null);

    const icons = {
        General: <FaBuilding />,
        'IFC Performance Standards Compliance': <FaGlobe />,
        'Compliance with Environment and Social Action Plan': <FaTree />,
        'Energy Efficiency and Climate': <FaBolt />,
        'Impact Data': <FaChartBar />
    };

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
        onCategoryClick(category);
    };

    return (
        <div className="w-full z-20 fixed top-0 left-0 bg-white p-2 rounded-lg shadow-md flex justify-evenly items-center space-x-2 overflow-x-auto">
            {categories.map((category, index) => (
                <button
                    key={index}
                    className={`flex flex-col items-center font-semibold py-1 px-2 rounded-lg transition-all duration-300 ease-in-out text-sm
                        ${category === selectedCategory ? 'bg-blue-100 shadow-lg text-[#01B0F1]' : 'bg-white text-[#01B0F1] hover:bg-blue-100 hover:text-blue-800'}
                     hover:shadow-lg transform hover:scale-105`}
                    onClick={() => handleCategoryClick(category)}
                >
                    <div className="text-xl mb-1">{icons[category] || <FaBuilding />}</div>
                    <span className="text-xs">{category}</span>
                    
                    {/* Progress Bar */}
                    {progress[category] && (
                        <div className="w-full mt-1 h-1 bg-gray-200 rounded-full">
                            <div
                                className="h-full bg-[#01B0F1] rounded-sm"
                                style={{ width: `${progress[category]}%` }}  // Progress percentage
                            ></div>
                        </div>
                    )}
                </button>
            ))}
        </div>
    );
};

export default Topbar;
