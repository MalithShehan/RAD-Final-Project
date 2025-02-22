import React, { useState } from "react";

const ReturnBook = () => {
    const [issuedBooks, setIssuedBooks] = useState([
        { id: 1, student: "John Doe", book: "To Kill a Mockingbird", issueDate: "2025-02-15" },
        { id: 2, student: "Jane Smith", book: "1984", issueDate: "2025-02-16" },
    ]);

    const [selectedBook, setSelectedBook] = useState("");
    const [searchTerm, setSearchTerm] = useState("");

    const handleReturnBook = () => {
        if (!selectedBook) {
            alert("Please select a book to return.");
            return;
        }

        const updatedBooks = issuedBooks.filter((book) => book.book !== selectedBook);
        setIssuedBooks(updatedBooks);
        setSelectedBook("");
        alert("Book returned successfully!");
    };

    const filteredIssuedBooks = issuedBooks.filter((issue) =>
        `${issue.student} ${issue.book}`.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="max-w-5xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
            <h1 className="text-2xl font-bold text-center mb-6">Return Book</h1>

            {/* Select Book */}
            <div className="mb-4">
                <label className="block font-medium mb-2">Select Book to Return</label>
                <select
                    value={selectedBook}
                    onChange={(e) => setSelectedBook(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                    <option value="">-- Select a Book --</option>
                    {issuedBooks.map((issue) => (
                        <option key={issue.id} value={issue.book}>
                            {issue.book} (Issued to {issue.student})
                        </option>
                    ))}
                </select>
            </div>

            {/* Return Button */}
            <div className="mb-6 text-center">
                <button
                    onClick={handleReturnBook}
                    className="px-6 py-2 bg-yellow-600 text-white font-semibold rounded-lg shadow-md hover:bg-yellow-500"
                >
                    Return Book
                </button>
            </div>

            {/* Search Bar */}
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search issued books"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
            </div>

            {/* Issued Books List */}
            <table className="min-w-full border-collapse border border-gray-200">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border border-gray-300 px-4 py-2">ID</th>
                        <th className="border border-gray-300 px-4 py-2">Student</th>
                        <th className="border border-gray-300 px-4 py-2">Book</th>
                        <th className="border border-gray-300 px-4 py-2">Issue Date</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredIssuedBooks.length > 0 ? (
                        filteredIssuedBooks.map((issue) => (
                            <tr key={issue.id} className="hover:bg-gray-50">
                                <td className="border border-gray-300 px-4 py-2 text-center">{issue.id}</td>
                                <td className="border border-gray-300 px-4 py-2">{issue.student}</td>
                                <td className="border border-gray-300 px-4 py-2">{issue.book}</td>
                                <td className="border border-gray-300 px-4 py-2 text-center">{issue.issueDate}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" className="text-center text-gray-500 py-4">
                                No issued books found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default ReturnBook;
