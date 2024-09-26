import React from 'react';
import { FaLeaf, FaChartLine, FaIndustry, FaUsers, FaShieldAlt } from 'react-icons/fa';

const Sidebar = ({ subcategories, onSubcategoryClick, selectedSubcategory }) => {
    const subcategoryIcons = {
        'Human Resources': <FaUsers />,
        Environment: <FaLeaf />,
        'Community Relations': <FaChartLine />,
        'Health and Safety': <FaShieldAlt />,
        'Energy Efficiency': <FaIndustry />
    };

    return (
        <div className="w-64 left-0 top-8 h-full bg-gradient-to-b from-white rounded-lg to-gray-50 p-4 shadow-lg mt-1 relative">
            
            
            {subcategories.length > 0 ? (
                <ul className="space-y-4 ">
                    {subcategories.map((subcategory, index) => (
                        <li key={index} className="relative">
                            
                            <button
                                className={`w-full flex items-center justify-start gap-3 px-4 py-3 rounded-xl transition duration-200 ease-in-out shadow-sm
                                ${selectedSubcategory === subcategory ? 'bg-blue-100 text-[#01B0F1] shadow-lg' : 'bg-white text-[#01B0F1] hover:bg-blue-100 hover:text-blue-800'}
                                hover:shadow-lg transform hover:scale-105`}
                                onClick={() => onSubcategoryClick(subcategory)}
                            >
                                <span className="text-lg p-1 bg-blue-100 rounded-full">
                                    {subcategoryIcons[subcategory] || <FaIndustry />}
                                </span>
                                <span className="font-semibold text-sm">{subcategory}</span>
                            </button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No subcategories available for this category.</p>
            )}
        </div>
    );
};

export default Sidebar;
