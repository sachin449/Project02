// Path: client/src/components/Sidebar.jsx
import React from 'react';

const Sidebar = ({ subcategories, onSubcategoryClick }) => {
    return (
        <div className="w-64 fixed left-0 top-16 h-full bg-gray-100 p-4 shadow-md">
            <h2 className="text-4xl font-bold mb-10">Subcategories</h2>
            {subcategories.length > 0 ? (
                <ul className="space-y-8">
                    {subcategories.map((subcategory, index) => (
                        <li key={index}>
                            <button 
                                className="w-full bg-blue-500 text-white text-lg font-semibold py-5 px-4 rounded-xl"
                                onClick={() => onSubcategoryClick(subcategory)} // Call this function on click
                            >
                                {subcategory}
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


// Path: client/src/components/SubcategoryMenu.jsx
// import React from 'react';

// const Leftbar = ({ subcategories }) => {
//     const filteredSubcategories = subcategories.filter(subcategory => subcategory);

//     return (
//         <div className="w-64 fixed left-0 top-0 h-full bg-gray-100 p-4 shadow-md">
//             <h2 className="text-4xl font-bold ml-14 mt-10 mb-20">Menu</h2>
//             <ul className="space-y-8">
//                 {filteredSubcategories.map((subcategory, index) => (
//                     <li key={index}>
//                         <button className="w-full bg-blue-500 text-white text-lg font-semibold py-5 px-4 rounded-xl">
//                             {subcategory}
//                         </button>
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// };
// export default Leftbar;
