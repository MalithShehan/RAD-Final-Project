import React, { useState } from "react";

const StudentList = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [students, setStudents] = useState([
        // { id: 1, firstName: "John", middleName: "D.", lastName: "Doe", studentId: "S001", city: "New York", phone: "1234567890", studentClass: "10A" },
        // { id: 2, firstName: "Jane", middleName: "M.", lastName: "Smith", studentId: "S002", city: "Los Angeles", phone: "0987654321", studentClass: "12B" },
        // // Add more students as needed
    ]);

    const handleEdit = (id) => {
        alert(`Edit student with ID: ${id}`);
        // Logic to edit the student
    };

    const handleDelete = (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this student?");
        if (confirmDelete) {
            setStudents(students.filter((student) => student.id !== id));
        }
    };

    const filteredStudents = students.filter((student) =>
        `${student.firstName} ${student.lastName} ${student.studentId} ${student.city} ${student.studentClass}`
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
    );

    return (
        <div className="max-w-5xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
            <h1 className="text-2xl font-bold text-center mb-6">Student List</h1>

            {/* Search Bar */}
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search by name, ID, city, or class"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
            </div>

            {/* Student Table */}
            <table className="min-w-full border-collapse border border-gray-200">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border border-gray-300 px-4 py-2">Student ID</th>
                        <th className="border border-gray-300 px-4 py-2">Name</th>
                        <th className="border border-gray-300 px-4 py-2">City</th>
                        <th className="border border-gray-300 px-4 py-2">Phone</th>
                        <th className="border border-gray-300 px-4 py-2">Class</th>
                        <th className="border border-gray-300 px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredStudents.length > 0 ? (
                        filteredStudents.map((student) => (
                            <tr key={student.id} className="hover:bg-gray-50">
                                <td className="border border-gray-300 px-4 py-2 text-center">{student.studentId}</td>
                                <td className="border border-gray-300 px-4 py-2">
                                    {student.firstName} {student.middleName} {student.lastName}
                                </td>
                                <td className="border border-gray-300 px-4 py-2">{student.city}</td>
                                <td className="border border-gray-300 px-4 py-2">{student.phone}</td>
                                <td className="border border-gray-300 px-4 py-2">{student.studentClass}</td>
                                <td className="border border-gray-300 px-4 py-2 text-center">
                                    <button
                                        onClick={() => handleEdit(student.id)}
                                        className="px-3 py-1 bg-yellow-500 text-white font-semibold rounded-lg shadow-sm mr-2 hover:bg-yellow-600"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(student.id)}
                                        className="px-3 py-1 bg-red-500 text-white font-semibold rounded-lg shadow-sm hover:bg-red-600"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" className="text-center text-gray-500 py-4">
                                No students found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default StudentList;
