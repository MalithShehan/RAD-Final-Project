import React from "react";

const StudentList = () => {
    const students = [
        {
            id: 1,
            name: "John Doe",
            age: 16,
            grade: "10th Grade",
            image: "https://via.placeholder.com/50",
        },
        {
            id: 2,
            name: "Jane Smith",
            age: 17,
            grade: "11th Grade",
            image: "https://via.placeholder.com/50",
        },
        {
            id: 3,
            name: "Michael Brown",
            age: 15,
            grade: "9th Grade",
            image: "https://via.placeholder.com/50",
        },
    ];

    return (
        <div className="max-w-6xl mx-auto mt-10 p-6 bg-white shadow-md rounded-xl">
            <h1 className="text-2xl font-bold text-center mb-6">Student List</h1>
            <table className="min-w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border border-gray-300 px-4 py-2 text-left">Image</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Age</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Grade</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((student) => (
                        <tr key={student.id} className="hover:bg-gray-50">
                            <td className="border border-gray-300 px-4 py-2">
                                <img
                                    src={student.image}
                                    alt={student.name}
                                    className="w-12 h-12 rounded-full"
                                />
                            </td>
                            <td className="border border-gray-300 px-4 py-2">{student.name}</td>
                            <td className="border border-gray-300 px-4 py-2">{student.age}</td>
                            <td className="border border-gray-300 px-4 py-2">{student.grade}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default StudentList;
