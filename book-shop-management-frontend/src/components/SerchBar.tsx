import React from "react";

const SearchBar = (props) => {
    return (
        <div className="container mx-auto mt-5">
            <div className="flex justify-between items-center mb-3">
                {/* Search Section */}
                <div className="w-1/2">
                    <form className="flex space-x-2">
                        <input
                            className="form-control border rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                            type="search"
                            placeholder="Search"
                            aria-label="Search"
                            id="searchBar"
                            onChange={(e) => props.setSearchTerm(e.target.value)}
                        />
                        <button
                            className="px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow transition duration-200"
                            type="button"
                            id="searchButton"
                            onClick={props.handleSearch}
                        >
                            Search
                        </button>
                    </form>
                </div>

                {/* Add Button Section */}
                <div className="w-1/2 text-right">
                    <button
                        onClick={props.handleModal1}
                        className="inline-flex items-center px-4 py-2 text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-xl text-sm transition duration-300 shadow-md"
                    >
                        <svg
                            className="w-4 h-4 mr-2"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                        </svg>
                        Add
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SearchBar;
