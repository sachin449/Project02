// src/components/layout/MainLayout.jsx
import React from 'react';
import Sidebar from '../static/Sidebar';

const MainLayout = ({ children, selectedCategory, setSelectedCategory }) => {
    return (
        <div className="flex">
            <Sidebar selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
            <div className="p-6 flex-1">
                {children}
            </div>
        </div>
    );
};

export default MainLayout;