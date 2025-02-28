import React, { useState } from "react";

const Dashboard = () => {
    const [books, setBooks] = useState([]);
    const [students, setStudents] = useState([]);
    const [issues, setIssues] = useState(0); // Simulating issued books count
    const [searchTerm, setSearchTerm] = useState("");
    const [newBook, setNewBook] = useState({
        name: "",
        author: "",
        publisher: "",
        isbn: "",
        image: "",
    });
    const [showAddBookForm, setShowAddBookForm] = useState(false);

    // Handle Add Sample Students
    const addSampleStudents = () => {
        setStudents([
            { id: 1, name: "Student A" },
            { id: 2, name: "Student B" },
        ]);
    };

    // Handle Add Sample Books
    const addSampleBooks = () => {
        setBooks([
            {
                id: 1,
                name: "Book One",
                author: "Author A",
                publisher: "Publisher A",
                isbn: "12345",
                image: "https://via.placeholder.com/150",
            },
            {
                id: 2,
                name: "Book Two",
                author: "Author B",
                publisher: "Publisher B",
                isbn: "67890",
                image: "https://via.placeholder.com/150",
            },
        ]);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setNewBook((prevState) => ({
                    ...prevState,
                    image: reader.result,
                }));
            };
            reader.readAsDataURL(file);
        }
    };
    

    // Handle Search Input Change
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    // Filtered Books Based on Search Term
    const filteredBooks = books.filter((book) =>
        book.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Handle Input Changes for Add Book Form
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewBook({ ...newBook, [name]: value });
    };

    // Handle Add New Book Submission
    const handleAddBook = (e) => {
        e.preventDefault();
        if (newBook.name && newBook.author && newBook.publisher && newBook.isbn) {
            setBooks([...books, { id: Date.now(), ...newBook }]);
            setNewBook({
                name: "",
                author: "",
                publisher: "",
                isbn: "",
                image: "",
            });
            setShowAddBookForm(false);
        } else {
            alert("Please fill out all fields!");
        }
    };

    return (
        <div className="max-w-6xl mx-auto mt-10 p-6 bg-yellow-100 shadow-gray-300 shadow-md rounded-xl">
            <h1 className="text-2xl font-bold text-center mb-6">Book Dashboard</h1>

            {/* Buttons for Sample Data */}
            <div className="flex justify-self-end items-center mb-4">
                <button
                    onClick={() => setShowAddBookForm(true)}
                    className="px-4 py-2 bg-yellow-500 text-white rounded-lg shadow-sm hover:bg-yellow-600"
                >
                    Add New Book
                </button>
            </div>

            {/* Search Bar */}
            <div className="mb-6">
                <input
                    type="text"
                    placeholder="Search books by name..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
            </div>

            {/* Circle Counters Section */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center mb-8">
                {/* Student Count */}
                <div className="flex flex-col items-center">
                    <div className="w-24 h-24 flex items-center justify-center bg-blue-100 rounded-full shadow-md">
                        <p className="text-2xl font-bold text-blue-600">{students.length}</p>
                    </div>
                    <h2 className="text-lg font-semibold mt-2">Students</h2>
                </div>

                {/* Books Count */}
                <div className="flex flex-col items-center">
                    <div className="w-24 h-24 flex items-center justify-center bg-green-100 rounded-full shadow-md">
                        <p className="text-2xl font-bold text-green-600">{books.length}</p>
                    </div>
                    <h2 className="text-lg font-semibold mt-2">Books</h2>
                </div>

                {/* Issued Books Count */}
                <div className="flex flex-col items-center">
                    <div className="w-24 h-24 flex items-center justify-center bg-yellow-100 rounded-full shadow-md">
                        <p className="text-2xl font-bold text-yellow-600">{issues}</p>
                    </div>
                    <h2 className="text-lg font-semibold mt-2">Issued Books</h2>
                </div>
            </div>

            {/* Book List in Card Layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {filteredBooks.map((book) => (
                    <div
                        key={book.id}
                        className="bg-gray-100 shadow-md rounded-lg overflow-hidden"
                    >
                        <img
                            src={book.image || "https://via.placeholder.com/150"}
                            alt={book.name}
                            className="w-full h-40 object-cover"
                        />
                        <div className="p-4">
                            <h3 className="text-lg font-bold">{book.name}</h3>
                            <p className="text-sm text-gray-600">Author: {book.author}</p>
                            <p className="text-sm text-gray-600">Publisher: {book.publisher}</p>
                            <p className="text-sm text-gray-600">ISBN: {book.isbn}</p>
                        </div>
                    </div>
                ))}
            </div>

            {filteredBooks.length === 0 && (
                <p className="text-center text-gray-500 mt-6">No books found.</p>
            )}

            {/* Add New Book Form Overlay */}
            {showAddBookForm && (
                <div className="fixed inset-0 bg-gray-950 bg-opacity-75 flex items-center justify-center z-50">
                    <div className="bg-gray-100 shadow-lg rounded-lg p-8 w-96">
                        <h2 className="text-xl font-bold text-center mb-6">Add New Book</h2>
                        <form onSubmit={handleAddBook}>
                            <div className="mb-4">
                                <label className="block text-sm font-semibold mb-1">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={newBook.name}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-semibold mb-1">Author</label>
                                <input
                                    type="text"
                                    name="author"
                                    value={newBook.author}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-semibold mb-1">Publisher</label>
                                <input
                                    type="text"
                                    name="publisher"
                                    value={newBook.publisher}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-semibold mb-1">ISBN</label>
                                <input
                                    type="text"
                                    name="isbn"
                                    value={newBook.isbn}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    required
                                />
                            </div>

                            {/* Image Upload Field */}
                            <div className="mb-4">
                                <label className="block text-sm font-semibold mb-1">Book Image</label>
                                <input
                                    type="file"
                                    name="image"
                                    onChange={handleImageChange}
                                    accept="image/*"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                />
                                {/* Image Preview */}
                                {newBook.image && (
                                    <div className="mt-4 text-center">
                                        <img
                                            src={newBook.image}
                                            alt="Book preview"
                                            className="max-w-full h-48 object-cover rounded-lg"
                                        />
                                    </div>
                                )}
                            </div>

                            <div className="flex justify-between items-center">
                                <button
                                    type="button"
                                    onClick={() => setShowAddBookForm(false)}
                                    className="px-4 py-2 bg-gray-500 text-white rounded-lg shadow-sm hover:bg-gray-600"
                                >   
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-green-500 text-white rounded-lg shadow-sm hover:bg-green-600"
                                >
                                    Add Book
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}


        </div>
    );
};

export default Dashboard;
