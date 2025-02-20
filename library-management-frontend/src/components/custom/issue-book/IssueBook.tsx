import React, { useState } from "react";

const IssueBook = () => {
    const [students] = useState([
        // { id: 1, name: "John Doe" },
        // { id: 2, name: "Jane Smith" },
    ]);

    const [books] = useState([
        // { id: 1, title: "To Kill a Mockingbird" },
        // { id: 2, title: "1984" },
    ]);

    const [issuedBooks, setIssuedBooks] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState("");
    const [selectedBook, setSelectedBook] = useState("");
    const [searchTerm, setSearchTerm] = useState("");

    const handleIssueBook = () => {
        if (!selectedStudent || !selectedBook) {
            alert("Please select both a student and a book.");
            return;
        }

        const bookExists = issuedBooks.some(
            (item) => item.student === selectedStudent && item.book === selectedBook
        );

        if (bookExists) {
            alert("This book is already issued to this student.");
            return;
        }

        const newIssue = {
            id: issuedBooks.length + 1,
            student: selectedStudent,
            book: selectedBook,
            date: new Date().toLocaleDateString(),
        };

        setIssuedBooks([...issuedBooks, newIssue]);
        setSelectedStudent("");
        setSelectedBook("");
        alert("Book issued successfully!");
    };

    const filteredIssuedBooks = issuedBooks.filter((issue) =>
        `${issue.student} ${issue.book}`.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="max-w-5xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
            <h1 className="text-2xl font-bold text-center mb-6">Issue Books</h1>

            {/* Select Student */}
            <div className="mb-4">
                <label className="block font-medium mb-2">Select Student</label>
                <select
                    value={selectedStudent}
                    onChange={(e) => setSelectedStudent(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                    <option value="">-- Select a Student --</option>
                    {students.map((student) => (
                        <option key={student.id} value={student.name}>
                            {student.name}
                        </option>
                    ))}
                </select>
            </div>

            {/* Select Book */}
            <div className="mb-4">
                <label className="block font-medium mb-2">Select Book</label>
                <select
                    value={selectedBook}
                    onChange={(e) => setSelectedBook(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                    <option value="">-- Select a Book --</option>
                    {books.map((book) => (
                        <option key={book.id} value={book.title}>
                            {book.title}
                        </option>
                    ))}
                </select>
            </div>

            {/* Issue Button */}
            <div className="mb-6 text-center">
                <button
                    onClick={handleIssueBook}
                    className="px-6 py-2 bg-yellow-600 text-white font-semibold rounded-lg shadow-md hover:bg-yellow-500"
                >
                    Issue Book
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
                                <td className="border border-gray-300 px-4 py-2 text-center">{issue.date}</td>
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

export default IssueBook;
