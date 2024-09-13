

const Topbar = ({ subcategories }) => {
    const filteredSubcategories = subcategories.filter(subcategory => subcategory);

    return (
        <div className="w-full fixed top-0 left-0 bg-gray-100 p-4 mb-20 shadow-md flex justify-evenly">
            {filteredSubcategories.map((subcategory, index) => (
                <button key={index} className="bg-[#01b0f1] text-white text-lg font-semibold py-3 px-6 rounded-lg">
                    {subcategory}
                </button>
            ))}
        </div>
    );
};

export default Topbar;
