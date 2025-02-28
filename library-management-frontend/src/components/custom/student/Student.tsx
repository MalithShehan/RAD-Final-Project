import React, { useState } from "react";

const StudentManagement = () => {
    const [students, setStudents] = useState([]);
    const [studentData, setStudentData] = useState({
        firstName: "",
        middleName: "",
        lastName: "",
        studentId: "",
        city: "",
        phone: "",
        class: "",
    });
    const [isEditing, setIsEditing] = useState(false);
    const [editingStudentId, setEditingStudentId] = useState(null);

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setStudentData((prev) => ({ ...prev, [name]: value }));
    };

    // Add or Update Student
    const handleSaveStudent = () => {
        if (
            !studentData.firstName ||
            !studentData.lastName ||
            !studentData.studentId ||
            !studentData.city ||
            !studentData.phone ||
            !studentData.class
        ) {
            alert("Please fill in all required fields.");
            return;
        }

        if (isEditing) {
            setStudents((prev) =>
                prev.map((student) =>
                    student.studentId === editingStudentId ? studentData : student
                )
            );
            setIsEditing(false);
            setEditingStudentId(null);
        } else {
            setStudents((prev) => [...prev, studentData]);
        }

        setStudentData({
            firstName: "",
            middleName: "",
            lastName: "",
            studentId: "",
            city: "",
            phone: "",
            class: "",
        });
    };

    // Edit Student
    const handleEditStudent = (studentId) => {
        const studentToEdit = students.find((student) => student.studentId === studentId);
        setStudentData(studentToEdit);
        setIsEditing(true);
        setEditingStudentId(studentId);
    };

    // Delete Student
    const handleDeleteStudent = (studentId) => {
        setStudents((prev) => prev.filter((student) => student.studentId !== studentId));
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
            <h1 className="text-3xl font-bold mb-6">Student Management</h1>
            <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-md mb-6">
                <h2 className="text-xl font-semibold mb-4">
                    {isEditing ? "Edit Student" : "Add Student"}
                </h2>
                <div className="grid grid-cols-2 gap-4">
                    <input
                        type="text"
                        name="firstName"
                        value={studentData.firstName}
                        onChange={handleInputChange}
                        placeholder="First Name"
                        className="border p-2 rounded-lg w-full"
                    />
                    <input
                        type="text"
                        name="middleName"
                        value={studentData.middleName}
                        onChange={handleInputChange}
                        placeholder="Middle Name (optional)"
                        className="border p-2 rounded-lg w-full"
                    />
                    <input
                        type="text"
                        name="lastName"
                        value={studentData.lastName}
                        onChange={handleInputChange}
                        placeholder="Last Name"
                        className="border p-2 rounded-lg w-full"
                    />
                    <input
                        type="text"
                        name="studentId"
                        value={studentData.studentId}
                        onChange={handleInputChange}
                        placeholder="Student ID"
                        className="border p-2 rounded-lg w-full"
                        disabled={isEditing}
                    />
                    <input
                        type="text"
                        name="city"
                        value={studentData.city}
                        onChange={handleInputChange}
                        placeholder="City"
                        className="border p-2 rounded-lg w-full"
                    />
                    <input
                        type="text"
                        name="phone"
                        value={studentData.phone}
                        onChange={handleInputChange}
                        placeholder="Phone"
                        className="border p-2 rounded-lg w-full"
                    />
                    <input
                        type="text"
                        name="class"
                        value={studentData.class}
                        onChange={handleInputChange}
                        placeholder="Class"
                        className="border p-2 rounded-lg w-full"
                    />
                </div>
                <button
                    onClick={handleSaveStudent}
                    className={`${
                        isEditing ? "bg-green-500" : "bg-blue-500"
                    } text-white px-4 py-2 rounded-lg mt-4 hover:opacity-90`}
                >
                    {isEditing ? "Update Student" : "Add Student"}
                </button>
            </div>

            <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Student List</h2>
                {students.length > 0 ? (
                    <table className="table-auto w-full">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="px-4 py-2 text-left">Student ID</th>
                                <th className="px-4 py-2 text-left">Name</th>
                                <th className="px-4 py-2 text-left">City</th>
                                <th className="px-4 py-2 text-left">Phone</th>
                                <th className="px-4 py-2 text-left">Class</th>
                                <th className="px-4 py-2 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.map((student) => (
                                <tr key={student.studentId} className="border-b">
                                    <td className="px-4 py-2">{student.studentId}</td>
                                    <td className="px-4 py-2">
                                        {student.firstName} {student.middleName} {student.lastName}
                                    </td>
                                    <td className="px-4 py-2">{student.city}</td>
                                    <td className="px-4 py-2">{student.phone}</td>
                                    <td className="px-4 py-2">{student.class}</td>
                                    <td className="px-4 py-2 space-x-2">
                                        <button
                                            onClick={() => handleEditStudent(student.studentId)}
                                            className="bg-yellow-500 text-white px-3 py-1 rounded-lg hover:bg-yellow-600"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDeleteStudent(student.studentId)}
                                            className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p className="text-gray-500">No students added yet.</p>
                )}
            </div>
        </div>
    );
};

export default StudentManagement;
