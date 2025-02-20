import React, { useState } from "react";

const Dashboard = () => {
    const [books, setBooks] = useState([
        { id: 1, name: "Book One", author: "Author A", publisher: "Publisher A", isbn: "12345" },
        { id: 2, name: "Book Two", author: "Author B", publisher: "Publisher B", isbn: "67890" },
        { id: 3, name: "Book Three", author: "Author C", publisher: "Publisher C", isbn: "11223" },
    ]);
    const [searchTerm, setSearchTerm] = useState("");
    const [editBookId, setEditBookId] = useState(null);
    const [editFormData, setEditFormData] = useState({
        name: "",
        author: "",
        publisher: "",
        isbn: "",
    });

    // Handle Search
    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    // Handle Edit Button Click
    const handleEditClick = (book) => {
        setEditBookId(book.id);
        setEditFormData({ ...book });
    };

    // Handle Input Change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditFormData({ ...editFormData, [name]: value });
    };

    // Handle Save Changes
    const handleSave = () => {
        setBooks(
            books.map((book) =>
                book.id === editBookId ? { ...book, ...editFormData } : book
            )
        );
        setEditBookId(null); // Exit edit mode
    };

    // Handle Cancel Edit
    const handleCancel = () => {
        setEditBookId(null);
    };

    // Handle Delete
    const handleDelete = (id) => {
        setBooks(books.filter((book) => book.id !== id));
    };

    const filteredBooks = books.filter((book) =>
        book.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="max-w-6xl mx-auto mt-10 p-6 bg-white shadow-md rounded-xl">
            <h1 className="text-2xl font-bold text-center mb-6">Dashboard</h1>

            {/* Search Bar */}
            <div className="flex justify-between items-center mb-4">
                <input
                    type="text"
                    placeholder="Search books..."
                    value={searchTerm}
                    onChange={handleSearch}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
                <button
                    className="ml-4 px-4 py-2 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600"
                >
                    Add Book
                </button>
            </div>

            {/* Book List */}
            <table className="min-w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Author</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Publisher</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">ISBN</th>
                        <th className="border border-gray-300 px-4 py-2 text-center">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredBooks.map((book) => (
                        <tr key={book.id} className="hover:bg-gray-50">
                            {editBookId === book.id ? (
                                <>
                                    {/* Editable Row */}
                                    <td className="border border-gray-300 px-4 py-2">
                                        <input
                                            type="text"
                                            name="name"
                                            value={editFormData.name}
                                            onChange={handleInputChange}
                                            className="w-full px-2 py-1 border border-gray-300 rounded"
                                        />
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        <input
                                            type="text"
                                            name="author"
                                            value={editFormData.author}
                                            onChange={handleInputChange}
                                            className="w-full px-2 py-1 border border-gray-300 rounded"
                                        />
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        <input
                                            type="text"
                                            name="publisher"
                                            value={editFormData.publisher}
                                            onChange={handleInputChange}
                                            className="w-full px-2 py-1 border border-gray-300 rounded"
                                        />
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        <input
                                            type="text"
                                            name="isbn"
                                            value={editFormData.isbn}
                                            onChange={handleInputChange}
                                            className="w-full px-2 py-1 border border-gray-300 rounded"
                                        />
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2 text-center">
                                        <button
                                            onClick={handleSave}
                                            className="px-3 py-1 bg-green-500 text-white text-sm font-semibold rounded-md hover:bg-green-600 mr-2"
                                        >
                                            Save
                                        </button>
                                        <button
                                            onClick={handleCancel}
                                            className="px-3 py-1 bg-gray-500 text-white text-sm font-semibold rounded-md hover:bg-gray-600"
                                        >
                                            Cancel
                                        </button>
                                    </td>
                                </>
                            ) : (
                                <>
                                    {/* Normal Row */}
                                    <td className="border border-gray-300 px-4 py-2">{book.name}</td>
                                    <td className="border border-gray-300 px-4 py-2">{book.author}</td>
                                    <td className="border border-gray-300 px-4 py-2">{book.publisher}</td>
                                    <td className="border border-gray-300 px-4 py-2">{book.isbn}</td>
                                    <td className="border border-gray-300 px-4 py-2 text-center">
                                        <button
                                            onClick={() => handleEditClick(book)}
                                            className="px-3 py-1 bg-blue-500 text-white text-sm font-semibold rounded-md hover:bg-blue-600 mr-2"
                                        >
                                            Edit
                                        </button>
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2 text-center">
                                    <button
                                            onClick={() => handleDelete(book.id)}
                                            className="px-3 py-1 bg-red-500 text-white text-sm font-semibold rounded-md hover:bg-red-600"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Dashboard;
