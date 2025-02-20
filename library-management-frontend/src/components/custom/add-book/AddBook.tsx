import React, { useState } from "react";

const AddBook = () => {
    const [formData, setFormData] = useState({
        name: "",
        author: "",
        publisher: "",
        isbn: "",
        image: null,
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleImageChange = (e) => {
        setFormData({
            ...formData,
            image: e.target.files[0],
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Data Submitted:", formData);

        // Handle the form submission logic here (e.g., API call)
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-xl">
            <h1 className="text-2xl font-bold text-center mb-6">Add Book</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Book Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <div>
                    <label htmlFor="author" className="block text-sm font-medium text-gray-700">
                        Author
                    </label>
                    <input
                        type="text"
                        id="author"
                        name="author"
                        value={formData.author}
                        onChange={handleInputChange}
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <div>
                    <label htmlFor="publisher" className="block text-sm font-medium text-gray-700">
                        Publisher
                    </label>
                    <input
                        type="text"
                        id="publisher"
                        name="publisher"
                        value={formData.publisher}
                        onChange={handleInputChange}
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <div>
                    <label htmlFor="isbn" className="block text-sm font-medium text-gray-700">
                        ISBN
                    </label>
                    <input
                        type="text"
                        id="isbn"
                        name="isbn"
                        value={formData.isbn}
                        onChange={handleInputChange}
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <div>
                    <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                        Upload Image
                    </label>
                    <input
                        type="file"
                        id="image"
                        name="image"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="mt-1 block w-full text-gray-500"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full py-2 px-4 bg-yellow-600 text-white font-semibold rounded-lg shadow-md hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
                >
                    Add Book
                </button>
            </form>
        </div>
    );
};

export default AddBook;
